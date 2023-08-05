/**
 * Function to format user error information.
 * @param {Object} user - The user object that the error is associated with.
 * @returns {string} - A formatted string detailing the user error.
 */

export const UserErrorInfo = (user) => {
    if (!user || !user.name || !user.lastname || !user.email) {
        throw new UserErrorInfo('Los detalles del usuario no están disponibles o son incorrectos', null);
    }

    return `
    Error con el usuario
    Nombre > ${user.first_name} 
    Apellido > ${user.last_name} 
    Correo electrónico > ${user.email}
    Rol > ${user.rol}
    `;
    
}


/**
 * Function to format database error information.
 * @param {Object} error 
 * @returns {string}
 */
export const DatabaseErrorInfo = (error) => {
    if (!error || !error.message) {
        throw new Error('Los detalles del error de la base de datos no están disponibles o son incorrectos', null);
    }

    return `Error con la base de datos: ${error.message}`;
}


/**
 * Function to format route error information.
 * @param {string} route 
 * @returns {string}
 */
export const RouteErrorInfo = (route) => {
    if (!route) {
        throw new RouteError('El nombre de la ruta no está disponible o es incorrecto', null);
    }

    return `Error con la ruta: ${route}`;
}

/**
 * Function to format product error information.
 * @param {Object} product
 * @returns {string} 
 */
export const ProductErrorInfo = (product) => {
    if (!product || !product.id || !product.title) {
        throw new ProductErrorInfo('Los detalles del producto no están disponibles o son incorrectos', null);
    }

    return `
    Error con el producto
    ID > ${product.id} 
    Nombre > ${product.name}`;
}

/**
 * Function to format ticket error information.
 * @param {Object} ticket
 * @returns {string}
 */
export const TicketErrorInfo = (ticket) => {
    if (!ticket || !ticket.items || !ticket.user) {
        throw new TicketErrorInfo('Los detalles del ticket no están disponibles o son incorrectos', null);

    }

    return `Error con el ticket: ID > ${ticket.id}`;
}
