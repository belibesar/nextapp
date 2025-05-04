


export async function notifyUser(userId: string, orderId: string) {
    console.log(`Notification sent to user ${userId} for order ${orderId}`);
    // Tambahkan logika notifikasi ke user (misalnya, email atau push notification)
  }
  
export async function notifyAdmin(orderId: string) {
    console.log(`Notification sent to admin for order ${orderId}`);
    // Tambahkan logika notifikasi ke admin (misalnya, email atau push notification)
 }