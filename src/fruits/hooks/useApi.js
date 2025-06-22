// src/hooks/useApi.js
import { useState } from 'react';

const API_BASE = '/api/fruit';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función base para hacer fetch con manejo de errores
  const fetchData = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      const errorMessage = `Error al cargar datos: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Funciones específicas para cada endpoint
  const getAllFruits = async () => {
    return fetchData(`${API_BASE}/all`);
  };

  const getFruitsByFamily = async (family) => {
    if (!family) {
      throw new Error('El parámetro familia es requerido');
    }
    return fetchData(`${API_BASE}/family/${encodeURIComponent(family)}`);
  };

  const getFruitsByOrder = async (order) => {
    if (!order) {
      throw new Error('El parámetro orden es requerido');
    }
    return fetchData(`${API_BASE}/order/${encodeURIComponent(order)}`);
  };

  const getFruitsByGenus = async (genus) => {
    if (!genus) {
      throw new Error('El parámetro género es requerido');
    }
    return fetchData(`${API_BASE}/genus/${encodeURIComponent(genus)}`);
  };

  const getFruitByName = async (name) => {
    if (!name) {
      throw new Error('El parámetro nombre es requerido');
    }
    return fetchData(`${API_BASE}/${encodeURIComponent(name)}`);
  };

  // Función para limpiar errores manualmente
  const clearError = () => {
    setError(null);
  };

  // Función genérica para búsquedas dinámicas
  const searchFruits = async (searchType, searchValue) => {
    switch (searchType) {
      case 'family':
        return getFruitsByFamily(searchValue);
      case 'order':
        return getFruitsByOrder(searchValue);
      case 'genus':
        return getFruitsByGenus(searchValue);
      case 'name':
        return getFruitByName(searchValue);
      default:
        return getAllFruits();
    }
  };

  return {
    // Funciones específicas
    getAllFruits,
    getFruitsByFamily,
    getFruitsByOrder,
    getFruitsByGenus,
    getFruitByName,
    searchFruits,

    // Estados
    loading,
    error,

    // Utilidades
    clearError
  };
};