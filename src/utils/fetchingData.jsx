export const fetchIncidencias = async () => {
    try {
        const response = await fetch("/api/incidencia");
        return await response.json();
    } catch (error) {
        console.error("Error fetching incidencias:", error);
        throw error;
    }
}

export const fetchMarkers = async () => {
    try {
      const response = await fetch("/api/ubicacion");
      return await response.json();
    } catch (error) {
      console.error("Error fetching markers:", error);
      throw error;
    }
  };
  
  export const fetchClasificaciones = async () => {
    try {
      const response = await fetch("/api/clasificacion");
      return await response.json();
    } catch (error) {
      console.error("Error fetching clasificaciones:", error);
      throw error;
    }
  };
  
  export const fetchOcurrencias = async () => {
    try {
      const response = await fetch("/api/ocurrencia");
      return await response.json();
    } catch (error) {
      console.error("Error fetching ocurrencias:", error);
      throw error;
    }
  };
  
  export const fetchZonas = async () => {
    try {
      const response = await fetch("/api/zona");
      return await response.json();
    } catch (error) {
      console.log("Error fetching zonas:", error);
      throw error;
    }
  };
  
  export const fetchNumeroCamara = async () => {
    try {
      const response = await fetch("/api/ubicacion");
      return await response.json();
    } catch (error) {
      console.log("Error fetching numeroCamara:", error);
      throw error;
    }
  };
  
  export const fetchOperadores = async () => {
    try {
      const response = await fetch("/api/workstation");
      return await response.json();
    } catch (error) {
      console.log("Error fetching operadores:", error);
      throw error;
    }
  };
  
  export const fetchTurno = async () => {
    try {
      const response = await fetch("/api/turno");
      return await response.json();
    } catch (error) {
      console.log("Error fetching turno:", error);
      throw error;
    }
  };
  
  export const fetchComisarias = async () => {
    try {
      const response = await fetch("/api/comisaria");
      return await response.json();
    } catch (error) {
      console.log("Error fetching comisarias:", error);
      throw error;
    }
  };
  
  export const fetchGravedades = async () => {
    try {
      const response = await fetch("/api/gravedad");
      return await response.json();
    } catch (error) {
      console.log("Error fetching gravedades:", error);
      throw error;
    }
  };
  
  export const fetchVehiculos = async () => {
    try {
      const response = await fetch("/api/vehiculo");
      return await response.json();
    } catch (error) {
      console.log("Error fetching vehiculos:", error);
      throw error;
    }
  };
  
  export const fetchUbicaciones = async () => {
    try {
      const response = await fetch("/api/ubicacion");
      return await response.json();
    } catch (error) {
      console.log("Error fetching ubicaciones:", error);
      throw error;
    }
  };
  
  export const fetchWorkstations = async () => {
    try {
      const response = await fetch("/api/workstation");
      return await response.json();
    } catch (error) {
      console.log("Error fetching workstations:", error);
      throw error;
    }
  };

  export const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      return await response.json();
    } catch (error) {
      console.log("Error fetching users:", error);
      throw error;
    }
  };
  