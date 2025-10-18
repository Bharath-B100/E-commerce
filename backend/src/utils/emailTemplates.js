exports.orderConfirmationTemplate = (order, user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #3498db; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .order-details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .footer { text-align: center; padding: 20px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Order Confirmation</h1>
                </div>
                <div class="content">
                    <p>Hello ${user.name},</p>
                    <p>Thank you for your order! Your order has been confirmed and is being processed.</p>
                    
                    <div class="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
                    </div>
                    
                    <p>We'll notify you when your order ships.</p>
                    <p>Thank you for shopping with us!</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} ShopEasy. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

exports.welcomeEmailTemplate = (user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2ecc71; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .footer { text-align: center; padding: 20px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to ShopEasy!</h1>
                </div>
                <div class="content">
                    <p>Hello ${user.name},</p>
                    <p>Welcome to ShopEasy! Your account has been successfully created.</p>
                    <p>We're excited to have you as our customer. Start shopping and discover amazing products!</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} ShopEasy. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};