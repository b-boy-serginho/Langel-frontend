// src/pages/HomePage.jsx

import React from 'react';
import { 
  HiShoppingBag, 
  HiUsers, 
  HiDocumentText, 
  HiTrendingUp,
  HiCurrencyDollar,
  HiChartBar,
  HiClock,
  HiCheckCircle
} from 'react-icons/hi';

const HomePage = () => {
  // Datos de ejemplo para el dashboard
  const stats = [
    {
      title: 'Total Productos',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: HiShoppingBag,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Clientes Activos',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: HiUsers,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Recibos Generados',
      value: '89',
      change: '+23%',
      changeType: 'positive',
      icon: HiDocumentText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Ingresos del Mes',
      value: '$12,450',
      change: '+15%',
      changeType: 'positive',
      icon: HiCurrencyDollar,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Nuevo producto agregado',
      description: 'iPhone 15 Pro Max - $1,200',
      time: 'Hace 2 horas',
      icon: HiShoppingBag,
      color: 'text-blue-500'
    },
    {
      id: 2,
      action: 'Cliente registrado',
      description: 'María González',
      time: 'Hace 4 horas',
      icon: HiUsers,
      color: 'text-green-500'
    },
    {
      id: 3,
      action: 'Recibo generado',
      description: 'Recibo #001234 - $450',
      time: 'Hace 6 horas',
      icon: HiDocumentText,
      color: 'text-purple-500'
    },
    {
      id: 4,
      action: 'Pago procesado',
      description: 'Pago de $250 confirmado',
      time: 'Hace 8 horas',
      icon: HiCheckCircle,
      color: 'text-teal-500'
    }
  ];

  const quickActions = [
    {
      title: 'Agregar Producto',
      description: 'Registrar nuevo producto',
      icon: HiShoppingBag,
      color: 'bg-blue-500',
      href: '/products'
    },
    {
      title: 'Nuevo Cliente',
      description: 'Registrar cliente',
      icon: HiUsers,
      color: 'bg-green-500',
      href: '/clients'
    },
    {
      title: 'Generar Recibo',
      description: 'Crear nuevo recibo',
      icon: HiDocumentText,
      color: 'bg-purple-500',
      href: '/receipts'
    },
    {
      title: 'Ver Reportes',
      description: 'Análisis de ventas',
      icon: HiChartBar,
      color: 'bg-teal-500',
      href: '/reports'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header de bienvenida */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-blue-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
              ¡Bienvenido, <span className="bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">Luis Angel</span>!
            </h1>
            <p className="text-teal-100 text-xl font-medium">
              Aquí tienes un resumen de tu sistema de gestión
            </p>
            {/* <div className="flex items-center space-x-4 mt-6">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Sistema Activo</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-sm font-medium">Última actualización: Hoy</span>
              </div>
            </div> */}
          </div>
          <div className="hidden md:block relative">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <HiChartBar className="w-16 h-16 text-white/80 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${stat.changeType === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{stat.change} vs mes anterior</span>
                    </div>
                  </div>
                </div>
                <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acciones rápidas */}
        {/* <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                <HiChartBar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Acciones Rápidas</h3>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="group relative flex items-center p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-md border border-transparent hover:border-gray-200/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`relative w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="relative flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-200">{action.title}</p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{action.description}</p>
                    </div>
                    <div className="relative w-2 h-2 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </div> */}

        {/* Actividad reciente */}
        {/* <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <HiClock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="group relative flex items-start space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 hover:scale-105 border border-transparent hover:border-gray-200/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`relative w-10 h-10 bg-gradient-to-br ${activity.color.replace('text-', 'from-').replace('-500', '-100')} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-200">{activity.action}</p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-200">
                          <HiClock className="w-3 h-3" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>

      {/* Gráfico de tendencias (placeholder) */}
      {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-900/5 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <HiTrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Tendencias de Ventas</h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-teal-50 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-teal-700">Este mes</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-600">Mes anterior</span>
            </div>
          </div>
        </div>
        <div className="relative h-64 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5"></div>
          <div className="relative text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <HiTrendingUp className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-1">Gráfico de tendencias</p>
            <p className="text-sm text-gray-500">Los datos se mostrarán aquí</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;

