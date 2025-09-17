'use client'

import {
  Sprout,
  Settings,
  Sun,
  Truck,
  Flame,
  Package,
  MapPin,
  Store,
  CheckCircle,
  Clock,
  Circle
} from 'lucide-react'

interface BatchData {
  batch_id: string
  harvest_date: string | null
  processing_method: string | null
  drying_method: string | null
  transport_mode: string | null
  roast_date: string | null
  pack_date: string | null
  distribution_date: string | null
  retail_date: string | null
  status: string
}

interface TrackingStage {
  id: string
  name: string
  description: string
  date: string | null
  status: 'completed' | 'current' | 'pending'
  icon: React.ReactNode
  field: keyof BatchData
}

interface BatchTrackingTimelineProps {
  batch: BatchData
  language: 'es' | 'en'
}

export default function BatchTrackingTimeline({ batch, language }: BatchTrackingTimelineProps) {

  const getTrackingStages = (): TrackingStage[] => {
    const stages: TrackingStage[] = [
      {
        id: 'harvest',
        name: language === 'es' ? 'Cosecha' : 'Harvest',
        description: language === 'es' ? 'Recolección de cerezas' : 'Cherry collection',
        date: batch.harvest_date,
        status: 'pending',
        icon: <Sprout className="w-5 h-5" />,
        field: 'harvest_date'
      },
      {
        id: 'processing',
        name: language === 'es' ? 'Procesamiento' : 'Processing',
        description: language === 'es' ? 'Beneficio del café' : 'Coffee processing',
        date: batch.harvest_date, // Assuming processing happens same day as harvest
        status: 'pending',
        icon: <Settings className="w-5 h-5" />,
        field: 'processing_method'
      },
      {
        id: 'drying',
        name: language === 'es' ? 'Secado' : 'Drying',
        description: language === 'es' ? 'Secado del grano' : 'Bean drying',
        date: batch.harvest_date, // Will be calculated based on harvest + few days
        status: 'pending',
        icon: <Sun className="w-5 h-5" />,
        field: 'drying_method'
      },
      {
        id: 'transport',
        name: language === 'es' ? 'Transporte' : 'Transport',
        description: language === 'es' ? 'Traslado a planta' : 'Transport to facility',
        date: batch.harvest_date, // Will be calculated
        status: 'pending',
        icon: <Truck className="w-5 h-5" />,
        field: 'transport_mode'
      },
      {
        id: 'roasting',
        name: language === 'es' ? 'Tostado' : 'Roasting',
        description: language === 'es' ? 'Tostado artesanal' : 'Artisan roasting',
        date: batch.roast_date,
        status: 'pending',
        icon: <Flame className="w-5 h-5" />,
        field: 'roast_date'
      },
      {
        id: 'packaging',
        name: language === 'es' ? 'Empacado' : 'Packaging',
        description: language === 'es' ? 'Empaque final' : 'Final packaging',
        date: batch.pack_date,
        status: 'pending',
        icon: <Package className="w-5 h-5" />,
        field: 'pack_date'
      },
      {
        id: 'distribution',
        name: language === 'es' ? 'Distribución' : 'Distribution',
        description: language === 'es' ? 'Envío a distribuidores' : 'Shipping to distributors',
        date: batch.distribution_date,
        status: 'pending',
        icon: <MapPin className="w-5 h-5" />,
        field: 'distribution_date'
      },
      {
        id: 'retail',
        name: language === 'es' ? 'Venta' : 'Retail',
        description: language === 'es' ? 'Disponible en tiendas' : 'Available in stores',
        date: batch.retail_date,
        status: 'pending',
        icon: <Store className="w-5 h-5" />,
        field: 'retail_date'
      }
    ]

    // Calculate status based on dates
    const today = new Date()
    let currentStageFound = false

    stages.forEach((stage, index) => {
      if (stage.date) {
        const stageDate = new Date(stage.date)
        if (stageDate <= today) {
          stage.status = 'completed'
        } else if (!currentStageFound) {
          stage.status = 'current'
          currentStageFound = true
        }
      } else if (!currentStageFound && index > 0) {
        // If no date but previous stages are completed, this might be current
        const previousStage = stages[index - 1]
        if (previousStage.status === 'completed') {
          stage.status = 'current'
          currentStageFound = true
        }
      }
    })

    return stages
  }

  const stages = getTrackingStages()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'current':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          line: 'bg-green-400'
        }
      case 'current':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          line: 'bg-blue-400'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          line: 'bg-gray-300'
        }
    }
  }

  const completedStages = stages.filter(s => s.status === 'completed').length
  const progressPercentage = (completedStages / stages.length) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7" />
          <div>
            <h3 className="text-xl font-bold">
              {language === 'es' ? 'Seguimiento de Lote' : 'Batch Tracking'}
            </h3>
            <p className="text-amber-100 text-sm">
              {language === 'es' ? 'Trazabilidad completa de la finca a tu taza' : 'Complete traceability from farm to cup'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">
              {language === 'es' ? 'Progreso del lote' : 'Batch progress'}
            </span>
            <span className="font-semibold">
              {completedStages} / {stages.length} {language === 'es' ? 'etapas' : 'stages'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-amber-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const colors = getStatusColors(stage.status)
            const isLast = index === stages.length - 1

            return (
              <div key={stage.id} className="relative">
                {/* Connecting line */}
                {!isLast && (
                  <div className={`absolute left-6 top-12 w-0.5 h-8 ${colors.line}`} />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon circle */}
                  <div className={`relative z-10 w-12 h-12 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center flex-shrink-0`}>
                    {stage.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : stage.status === 'current' ? (
                      <div className="relative">
                        {stage.icon}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        {stage.icon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-semibold text-lg ${
                          stage.status === 'pending'
                            ? 'text-gray-500'
                            : stage.status === 'current'
                            ? 'text-blue-700'
                            : 'text-gray-900'
                        }`}>
                          {stage.name}
                        </h4>
                        <p className={`text-sm ${
                          stage.status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {stage.description}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0 ml-4">
                        {stage.date ? (
                          <div className={`text-sm font-medium ${
                            stage.status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {new Date(stage.date).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">
                            {language === 'es' ? 'Pendiente' : 'Pending'}
                          </div>
                        )}

                        {stage.status === 'current' && (
                          <div className="text-xs text-blue-600 font-semibold mt-1">
                            {language === 'es' ? 'En proceso' : 'In progress'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer message */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">
                  {language === 'es' ? 'Calidad garantizada' : 'Quality guaranteed'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Cada etapa de este lote ha sido cuidadosamente monitoreada para garantizar la máxima calidad y trazabilidad.'
                    : 'Every stage of this batch has been carefully monitored to ensure maximum quality and traceability.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}