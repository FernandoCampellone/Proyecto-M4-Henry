import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder().setTitle('E-commerce PI Cohorte 52')
.setDescription("Éste es el proyecto integrador del módulo 4 del curso de Henry. La consiga era hacer un e-commerce de productos electrónicos usando de base TypeScript con NestJS para el manejo de las rutas,TypeORM y PostreSQL para la base de datos, Cloudinary para el manejo de imágenes y JWT para el manejo de autenticaciones. Cabe aclarar que DropSchema está activado, así que cada vez que se use esta documentación para hacer pruebas hay que crear usuarios nuevos. Si desea hacer que un usario sea Admin, hay que configurarlo directamente desde la DB")
.addBearerAuth().build()