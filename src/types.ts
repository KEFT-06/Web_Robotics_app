export interface SensorNode {
  id: string;
  location: string;
  temp: number;
  humidity: number;
  airQuality_MQ135: number;
}

export interface EnvironmentData {
  timestamp: string;
  nodes: SensorNode[];
}

export interface SolarDataPoint {
  time: string;
  voltage: number;
  current: number;
  power: number;
}

export interface SolarEnergyData {
  station: string;
  batteryLevel: number;
  history: SolarDataPoint[];
}

export interface DroneTelemetry {
  battery: number;
  speed: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface WaterMetrics {
  pH: number;
  turbidity: number;
  temperature: number;
  dissolvedOxygen: number;
}

export interface AquaticDroneData {
  missionId: string;
  status: string;
  telemetry: DroneTelemetry;
  waterMetrics: WaterMetrics;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  status: 'OK' | 'LOW' | 'CRITICAL';
}
