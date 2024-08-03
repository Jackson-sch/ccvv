import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import User from '@/models/User'; // Asegúrate de tener un modelo de usuario en tu proyecto

export async function POST(req) {
  // Obtén el secreto del webhook desde las variables de entorno
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Por favor, añade WEBHOOK_SECRET desde el Dashboard de Clerk a .env o .env.local');
  }

  // Obtén los headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Si no hay headers, devolver un error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Ocurrió un error -- no hay headers de svix', {
      status: 400,
    });
  }

  // Obtén el cuerpo de la solicitud
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Crea una nueva instancia de Svix con tu secreto
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verifica el payload con los headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Esto es opcional si quieres manejar el caso en el que no sea del tipo WebhookEvent
    if (evt instanceof WebhookEvent) {
      // Procesa el evento del webhook
      const { id, ...userData } = evt.data; // Extrae los datos necesarios del evento
      const eventType = evt.type;
      console.log(`Webhook con ID de ${id} y tipo de ${eventType}`);
      console.log('Cuerpo del webhook:', body);

      // Conecta a MongoDB si aún no lo has hecho
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }

      try {
        if (eventType === 'user.created') {
          // Si el evento es 'user.created', registra el nuevo usuario en la base de datos
          const newUser = new User(userData);
          await newUser.save();
          console.log(`Nuevo usuario creado: ${newUser._id}`);
        } else if (eventType === 'user.updated') {
          // Si el evento es 'user.updated', actualiza el usuario en la base de datos
          await User.updateOne({ id }, userData);
          console.log(`Usuario actualizado: ${id}`);
        }
      } catch (error) {
        console.error('Error guardando en la base de datos:', error);
        return new Response('Ocurrió un error', {
          status: 500,
        });
      }
    } else {
      console.error('El evento no es del tipo WebhookEvent');
      return new Response('Ocurrió un error', {
        status: 400,
      });
    }
  } catch (err) {
    console.error('Error verificando webhook:', err);
    return new Response('Ocurrió un error', {
      status: 400,
    });
  }

  return new Response('', { status: 200 });
}
