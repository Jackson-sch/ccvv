import { Webhook } from 'svix';
import { headers } from 'next/headers';
import User from "@/models/User/User";
import { dbConnect } from '@/lib/mongoose';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Por favor, añade WEBHOOK_SECRET desde el Dashboard de Clerk a .env o .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Ocurrió un error -- no hay headers de svix', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    // Verificar el webhook
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    const { id, email_addresses, ...userData } = evt.data;
    const eventType = evt.type;

    const email = email_addresses.length > 0 ? email_addresses[0].email_address : undefined;
    const clerkId = id;

    if (!email || !clerkId) {
      throw new Error('Faltan campos necesarios para la base de datos');
    }

    dbConnect();

    if (eventType === 'user.created') {
      const newUser = new User({
        clerkId,
        email,
        ...userData,
      });
      await newUser.save();
      console.log(`Nuevo usuario creado: ${newUser._id}`);
    } else if (eventType === 'user.updated') {
      await User.updateOne({ clerkId }, { ...userData });
      console.log(`Usuario actualizado: ${clerkId}`);
    }

  } catch (err) {
    console.error('Error verificando webhook:', err);
    return new Response('Ocurrió un error', { status: 400 });
  }

  return new Response('', { status: 200 });
}
