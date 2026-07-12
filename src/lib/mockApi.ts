import { EnvironmentData, SolarEnergyData, AquaticDroneData, StockItem } from '../types';

export const mockEnvironmentData = (): EnvironmentData => ({
  timestamp: new Date().toISOString(),
  nodes: [
    { id: 'ENV-Z1-YAOUNDE', location: 'Station Yaoundé-Nord', temp: 24.5, humidity: 45, airQuality_MQ135: 120 },
    { id: 'ENV-Z2-NKOMETOU', location: 'Barrage Nkometou', temp: 22.1, humidity: 50, airQuality_MQ135: 85 }
  ]
});

export const mockSolarData = (): SolarEnergyData => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const isDaytime = time.getHours() > 6 && time.getHours() < 18;
    const voltage = isDaytime ? 12.4 + (Math.random() * 1.2) : 11.8 + (Math.random() * 0.2);
    const current = isDaytime ? 2.5 + (Math.random() * 3) : 0.1;
    data.push({
      time: time.toISOString(),
      voltage: parseFloat(voltage.toFixed(2)),
      current: parseFloat(current.toFixed(2)),
      power: parseFloat((voltage * current).toFixed(2))
    });
  }
  return {
    station: 'STATION-SOLAIRE-NKOMETOU-01',
    batteryLevel: 82,
    history: data
  };
};

export const mockDroneData = (): AquaticDroneData => ({
  missionId: 'MSN-BATHYMETRIE-NKOMETOU-03',
  status: 'Inspection en cours',
  telemetry: {
    battery: 64,
    speed: 2.3,
    coordinates: { lat: 4.0204, lng: 11.5303 } // Coordonnées au Cameroun
  },
  waterMetrics: {
    pH: 7.2,
    turbidity: 14.5,
    temperature: 18.4,
    dissolvedOxygen: 8.1
  }
});

export const mockStockData = (): StockItem[] => [
  { id: 'PRT-001', name: 'Moteur Brushless 2306', category: 'Propulsion', quantity: 42, minThreshold: 5, status: 'OK' },
  { id: 'PRT-002', name: 'Contrôleur de vol F4', category: 'Électronique', quantity: 15, minThreshold: 3, status: 'OK' },
  { id: 'PRT-003', name: 'Capteur Température DHT22', category: 'Capteur', quantity: 30, minThreshold: 10, status: 'OK' },
  { id: 'PRT-004', name: 'Hélices 5 pouces (Set)', category: 'Structure', quantity: 45, minThreshold: 20, status: 'OK' },
  { id: 'PRT-005', name: 'Batterie LiPo 4S 1500mAh', category: 'Énergie', quantity: 28, minThreshold: 10, status: 'OK' }
];

export async function fetchWithFallback<T>(url: string, fallback: () => T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Fetch to ${url} failed, using fallback data.`, err);
    return fallback();
  }
}
