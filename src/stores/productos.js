import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([]);

  // Palabras clave para cada categoría
  const keywords = {
    Comida: [
      'pan', 'leche', 'arroz', 'pollo', 'galleta', 'queso', 'carne', 'pescado', 'fruta', 'verdura', 'yogur', 'azúcar', 'sal', 'aceite', 'huevo', 'cereal', 'fideo', 'tallarín', 'torta', 'pastel', 'bebida', 'jugo', 'café', 'te', 'sopa', 'snack', 'chocolate', 'dulce', 'mantequilla', 'jamón', 'salchicha', 'salsa', 'mayonesa', 'mostaza', 'ketchup',
      // Agrega verduras y frutas de tu lista
      'papa', 'zanahoria', 'tomate', 'harina', 'aji', 'arveja', 'brocoli', 'caigua', 'camote', 'cebolla', 'choclo', 'kion', 'maiz', 'pimenton', 'vainita', 'yuca', 'zapallo', 'chirimoja', 'chirimuya', 'chirimoya', 'granadilla', 'kiwi', 'limon', 'mango', 'manzana', 'pepino', 'membrillo', 'menbrillo', 'palta', 'pera', 'toronja', 'tuna', 'uva',
      'cerveza', 'pilsen', 'coronita', 'sixpack', 'twelvepack', 'panceta', 'crema', 'frijol', 'mazamorra', 'tamal', 'chancho'
      // Puedes agregar más si aparecen nuevos productos
    ],
    Tecnologia: [
      'laptop', 'mouse', 'teclado', 'monitor', 'celular', 'tablet', 'computadora', 'impresora', 'usb', 'cargador', 'audífono', 'parlante', 'pantalla', 'tv', 'televisor', 'notebook', 'smartphone', 'bocina', 'router', 'modem', 'disco', 'ssd', 'hdd', 'memoria', 'camara', 'webcam', 'microfono',
      'alexa', 'echo dot', 'airpods', 'apple', 'oculus', 'quest', 'generacion', 'dot'
    ],
    Ropa: [
      'polo', 'camisa', 'pantalón', 'short', 'zapatilla', 'zapato', 'casaca', 'abrigo', 'falda', 'vestido', 'blusa', 'buzo', 'chompa', 'chaqueta', 'jean', 'ropa', 'calzón', 'sostén', 'correa', 'medias', 'calcetín', 'chaleco', 'gorro', 'sombrero', 'bufanda', 'guante', 'traje', 'terno', 'camiseta', 'sandalia', 'botín', 'botas', 'pijama'
    ],
    Decoraciones: [
      'cuadro', 'florero', 'adorno', 'lámpara', 'alfombra', 'vela', 'cortina', 'cojín', 'espejo', 'retrato', 'tapiz', 'figura', 'escultura', 'jarrón', 'centro de mesa', 'portarretrato', 'guirnalda', 'reloj de pared', 'maceta', 'planta artificial', 'candelabro', 'cuadros', 'decoración', 'estatua', 'poster', 'vinilo', 'letrero', 'cartel', 'cuadro decorativo'
    ],
    Mascotas: [
      'alimento mascota', 'comida perro', 'comida gato', 'collar perro', 'juguete gato', 'juguete perro', 'cama mascota', 'correa', 'hueso', 'rascador', 'pecera', 'acuario', 'jaula', 'arena gato', 'cepillo mascota', 'premio perro', 'premio gato', 'bebedero', 'comedero', 'transportadora', 'arnés', 'ropa mascota', 'pelota perro', 'ratón gato', 'limpiador mascota'
    ],
    Herramientas: [
      'pistola para silicona', 'pistola de silicona', 'pistola silicona','pistola',
      'martillo', 'destornillador', 'taladro', 'llave inglesa', 'alicate', 'sierra', 'cinta métrica', 'nivel', 'tornillo', 'tuerca', 'clavo', 'broca', 'pinza', 'llave', 'cutter', 'escuadra', 'flexómetro', 'multímetro', 'soldador', 'serrucho', 'grifa', 'pico', 'pala', 'machete', 'cúter', 'regla', 'escuadra', 'compás', 'tijera', 'destornillador phillips', 'destornillador plano'
    ]
  };

  // Función para quitar tildes
  function quitarTildes(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Función para clasificar categoría
  function clasificarCategoria(producto) {
    const nombre = quitarTildes(producto.t_Nombre?.toLowerCase() || '')
      .replace(/[.,;:()\-_\[\]{}']/g, ' ');
    const palabrasNombre = nombre.split(/\s+/).filter(Boolean);

    // Casos especiales
    if (nombre.includes('silla gamer')) return 'Tecnologia';
    if (nombre.includes('silla')) return 'Decoraciones';
    if (nombre.includes('motor') || nombre.includes('kit motor')) return 'Herramientas';
    if (nombre.includes('arena gato') || nombre.includes('arena para gato')) return 'Mascotas';
    if (nombre.includes('comida perro') || nombre.includes('comida gato')) return 'Mascotas';

    // Coincidencia de todas las palabras de la frase clave (en cualquier orden)
    for (const categoria in keywords) {
      for (const palabra of keywords[categoria]) {
        const palabraSinTilde = quitarTildes(palabra.toLowerCase());
        const palabrasClave = palabraSinTilde.split(' ').filter(Boolean);
        if (palabrasClave.every(p => palabrasNombre.includes(p))) {
          return categoria;
        }
      }
    }

    // Coincidencia palabra por palabra (exacta o plural simple)
    for (const categoria in keywords) {
      for (const palabra of keywords[categoria]) {
        const palabraSinTilde = quitarTildes(palabra.toLowerCase());
        for (const palabraNombre of palabrasNombre) {
          if (
            palabraNombre === palabraSinTilde ||
            palabraNombre === palabraSinTilde + 's' ||
            palabraNombre === palabraSinTilde + 'es'
          ) {
            return categoria;
          }
        }
      }
    }

    return 'Otros';
  }


  // Cargar productos desde API y localStorage
  async function cargarProductos() {
    let lista = [];
    // 1. Cargar desde API
    try {
      const response = await fetch('https://demo.simplifica.pe:4040/movil/AppInventario/V1/WCF_Productos_Movil/F_Listado_Test');
      const data = await response.json();
      lista = (data.ltProductos || []).map(prod => ({
        ...prod,
        categoria: clasificarCategoria(prod)
      }));
    } catch (err) {
      // Si falla la API, ignora
    }
    // 2. Cargar desde localStorage
    let local = localStorage.getItem('productos_local');
    if (local) {
      const locales = JSON.parse(local).map(prod => ({
        ...prod,
        t_Nombre: prod.Nombre,
        n_Precio: prod.Precio,
        t_Foto: prod.Foto,
        categoria: prod.Categoria || clasificarCategoria(prod),
        n_Cantidad: prod.n_Cantidad ||  0,
      }));
      lista = [...locales, ...lista];
    }
    productos.value = lista;
  }

  // Computed para obtener productos por categoría
  const productosPorCategoria = computed(() => {
    const agrupados = {
      Comida: [], Tecnologia: [], Ropa: [], Decoraciones: [], Mascotas: [], Herramientas: [], Otros: []
    };
    for (const prod of productos.value) {
      agrupados[prod.categoria] = agrupados[prod.categoria] || [];
      agrupados[prod.categoria].push(prod);
    }
    return agrupados;
  });
  function incrementarStock(producto) {
    const p = productos.value.find(item => item.id === producto.id);
    if (!p) return;
    const max = (p.n_Stock_Maximo ?? 0) === 0 ? 5 : p.n_Stock_Maximo;
    if (p.n_Stock < max) p.n_Stock++;
  }

  function decrementarStock(producto) {
    const p = productos.value.find(item => item.id === producto.id);
    if (!p) return;
    const min = (p.n_Stock_Minima ?? 0) === 0 ? 1 : p.n_Stock_Minima;
    if (p.n_Stock > min) p.n_Stock--;
  }

  return {
    productos,
    cargarProductos,
    productosPorCategoria,
    clasificarCategoria,
    incrementarStock,
    decrementarStock
  };
});
