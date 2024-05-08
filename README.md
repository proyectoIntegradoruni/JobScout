# JobScout

## Descripción
Este proyecto desarrolla una plataforma integral de búsqueda de empleo que emplea técnicas de web scraping para recopilar datos de empleo, como ofertas de trabajo, requisitos y ubicaciones, de una variedad de sitios web de empleo y páginas web de empresas. La solución resultante brinda a los candidatos acceso a una amplia gama de oportunidades laborales, incluidas aquellas no disponibles en las plataformas tradicionales, lo que maximiza sus posibilidades de encontrar la oportunidad laboral ideal que se ajuste a sus habilidades, experiencia y preferencias. La plataforma se distingue por su interfaz de usuario intuitiva y fácil de usar, que permite a los usuarios buscar, filtrar y explorar las oportunidades de empleo según sus preferencias y criterios específicos. Además, se incorporan funciones adicionales, como alertas de empleo personalizadas, para mejorar la experiencia del usuario.



## Pasos para ejecutar la aplicación localmente

1. Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/proyectoIntegradoruni/JobScout.git

2. Ejecuta el Backend:

   ```bash
   cd Backend
   npm i 
   npx install playwright
   npm run dev

1. Ejecuta el Frontend:

   ```bash
   cd  Front
   npm i 
   npm run start


**Nota importante:** Antes de ejecutar la aplicación localmente, asegúrate de cambiar las URL de las peticiones del frontend para que apunten al puerto donde está corriendo el backend. Además de configurar la base de datos correspondiente Mongo