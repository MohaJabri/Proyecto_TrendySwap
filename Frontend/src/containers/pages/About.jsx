import Layout from "../../hocs/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Acerca de TrendySwap</h1>
          <p className="text-lg text-gray-600 mb-6">
            Bienvenido a nuestra plataforma de trueques, donde puedes intercambiar bienes y servicios sin necesidad de dinero.
            Creemos en la economía circular y en la importancia de reutilizar y reciclar lo que ya tenemos. Nuestra misión es
            conectar a personas con intereses comunes para que puedan intercambiar lo que necesitan de una manera justa y
            equitativa.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Nuestra plataforma es fácil de usar. Solo necesitas crear un perfil, listar los artículos o servicios que deseas
            intercambiar, y buscar ofertas que te interesen. Una vez que encuentres una oferta compatible, puedes contactar
            directamente con el otro usuario y coordinar el trueque.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">Beneficios de Usar Nuestra Plataforma</h2>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
            <li>Reducción de residuos y fomento de la reutilización.</li>
            <li>Acceso a bienes y servicios sin necesidad de dinero.</li>
            <li>Fomento de la comunidad y las relaciones locales.</li>
            <li>Contribución a una economía más sostenible.</li>
          </ul>

          <div >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trueques en TrendySwap</h2>
            <p className="text-lg text-gray-600 mb-6">
              En TrendySwap, puedes encontrar una amplia variedad de bienes y servicios para intercambiar. Algunas de las categorías populares incluyen:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
              <li>Ropa y Accesorios</li>
              <li>Electrónicos</li>
              <li>Muebles y Decoración del Hogar</li>
              <li>Libros y Artículos de Lectura</li>
              <li>Servicios Profesionales (como Diseño Gráfico, Tutorías, etc.)</li>
            </ul>
            <p className="text-lg text-gray-600 mb-6">
              ¡Explora nuestra plataforma y descubre las infinitas posibilidades de trueques que tenemos para ofrecerte!
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
