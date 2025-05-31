import { Order, OrderStatus } from './types';

// Function to send email via Mailtrap
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<boolean> => {
  try {
    const apiToken = process.env.NEXT_PUBLIC_MAILTRAP_API_TOKEN;
    const inboxId = process.env.NEXT_PUBLIC_MAILTRAP_INBOX_ID || '3744334';
    
    if (!apiToken) {
      console.error('Mailtrap API token not found');
      return false;
    }
    
    const response = await fetch(`https://sandbox.api.mailtrap.io/api/send/${inboxId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: "orders@esalesonestore.com",
          name: "ESales One Store"
        },
        to: [{ email: to }],
        subject,
        text,
        html: html || text,
        category: "Order Confirmation"
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to send email:', await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (
  order: Order,
  customerEmail: string
): Promise<boolean> => {
  const isApproved = order.status === 'approved';
  
  const subject = isApproved 
    ? `Order Confirmed: #${order.id}`
    : `Transaction Failed: #${order.id}`;
  
  let text = '';
  let html = '';
  
  if (isApproved) {
    // Approved transaction email
    text = `
      Thank you for your order #${order.id}!
      
      Your order has been confirmed and is being processed.
      
      Order Details:
      Date: ${new Date(order.createdAt).toLocaleDateString()}
      Total: $${order.total.toFixed(2)}
      
      Items:
      ${order.items.map(item => {
        const name = item.variant?.name || `Product ${item.productId}`;
        const price = item.variant?.price || 0;
        return `- ${name} (Qty: ${item.quantity}): $${(price * item.quantity).toFixed(2)}`;
      }).join('\n')}
      
      Shipping Address:
      ${order.customer.fullName}
      ${order.customer.address.street}
      ${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zipCode}
      ${order.customer.address.country}
      
      Thank you for shopping with us!
      ESales One Store Team
    `;
    
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h2 style="color: #4a5568;">Order Confirmed!</h2>
          <p style="font-size: 18px; color: #2d3748;">Thank you for your order #${order.id}</p>
        </div>
        
        <div style="padding: 20px;">
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #4a5568;">Order Details</h3>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4a5568;">Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <th style="text-align: left; padding: 8px;">Item</th>
                  <th style="text-align: center; padding: 8px;">Quantity</th>
                  <th style="text-align: right; padding: 8px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => {
                  const name = item.variant?.name || `Product ${item.productId}`;
                  const price = item.variant?.price || 0;
                  return `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 8px;">${name}</td>
                    <td style="text-align: center; padding: 8px;">${item.quantity}</td>
                    <td style="text-align: right; padding: 8px;">$${(price * item.quantity).toFixed(2)}</td>
                  </tr>
                `}).join('')}
                <tr>
                  <td colspan="2" style="text-align: right; padding: 8px;"><strong>Subtotal:</strong></td>
                  <td style="text-align: right; padding: 8px;">$${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; padding: 8px;"><strong>Tax:</strong></td>
                  <td style="text-align: right; padding: 8px;">$${order.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; padding: 8px;"><strong>Total:</strong></td>
                  <td style="text-align: right; padding: 8px;"><strong>$${order.total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #4a5568;">Shipping Address</h3>
            <p>${order.customer.fullName}</p>
            <p>${order.customer.address.street}</p>
            <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zipCode}</p>
            <p>${order.customer.address.country}</p>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p>Thank you for shopping with us!</p>
          <p>ESales One Store Team</p>
        </div>
      </div>
    `;
  } else {
    // Failed transaction email
    const statusText = order.status === 'declined' ? 'declined' : 'failed due to a gateway error';
    
    text = `
      Important: Your transaction for order #${order.id} was ${statusText}.
      
      Order Details:
      Date: ${new Date(order.createdAt).toLocaleDateString()}
      Total: $${order.total.toFixed(2)}
      
      What to do next:
      1. Please check your payment details and try again.
      2. If the issue persists, contact your bank to ensure there are no restrictions on your card.
      3. You can also try using a different payment method.
      
      Need help? Contact our support team at support@esalesonestore.com.
      
      Thank you,
      ESales One Store Team
    `;
    
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fee2e2; padding: 20px; text-align: center;">
          <h2 style="color: #b91c1c;">Transaction ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}</h2>
          <p style="font-size: 18px; color: #7f1d1d;">Your order #${order.id} could not be processed</p>
        </div>
        
        <div style="padding: 20px;">
          <p>We're sorry, but your transaction for order #${order.id} was ${statusText}.</p>
          
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #4a5568;">Order Details</h3>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 5px; background-color: #f8fafc;">
            <h3 style="margin-top: 0; color: #4a5568;">What to do next</h3>
            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 10px;">Please check your payment details and try again.</li>
              <li style="margin-bottom: 10px;">If the issue persists, contact your bank to ensure there are no restrictions on your card.</li>
              <li style="margin-bottom: 10px;">You can also try using a different payment method.</li>
            </ol>
          </div>
          
          <p>Need help? <a href="mailto:support@esalesonestore.com" style="color: #3b82f6;">Contact our support team</a>.</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <p>Thank you,</p>
          <p>ESales One Store Team</p>
        </div>
      </div>
    `;
  }
  
  return sendEmail(customerEmail, subject, text, html);
}; 