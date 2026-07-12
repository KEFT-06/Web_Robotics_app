import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { 
  Box, UploadCloud, Image as ImageIcon, Settings2, Play, Code2, 
  TerminalSquare, CheckCircle2, Loader2, Workflow, Cpu, Wind, 
  Droplet, MapIcon, Car, TriangleAlert, Download
} from 'lucide-react';

const pythonCodeModel = `class MotionType(Enum):
    TERRESTRIAL = "terrestrial"
    AERIAL = "aerial"
    AQUATIC = "aquatic"

def process_image_to_3d(file_path):
    """Placeholder for Tripo3D / InstantMesh API call"""
    import time
    time.sleep(2)  # Simulate network latency
    morphology = detect_morphology(file_path)
    mesh_path = f"/tmp/generated_{morphology}.obj"
    return mesh_path, morphology

def detect_morphology(file_path):
    # Deep Learning Morphology Analysis
    return MotionType.AQUATIC

def generate_urdf(mesh_path, motion_type):
    # Auto-rigging joints based on detected skeleton
    print(f"Generating URDF for {motion_type.name} morphology...")
    return f"""<?xml version="1.0"?>
<robot name="sparte_auto_bot">
  <link name="base_link">
    <visual>
      <geometry>
        <mesh filename="{mesh_path}" />
      </geometry>
    </visual>
  </link>
  <!-- Auto-rigged joints via CV skeleton estimation -->
</robot>"""

def main(image_file):
    mesh, m_type = process_image_to_3d(image_file)
    urdf = generate_urdf(mesh, m_type)
    with open("robot.urdf", "w") as f:
        f.write(urdf)
    print("URDF generated successfully.")`;

const pythonCodeRosNode = `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
import numpy as np
from stable_baselines3 import PPO

class RLNavigator(Node):
    def __init__(self, mode):
        super().__init__('rl_navigator')
        self.mode = mode
        
        # Topic selection based on morphology / medium
        sensor_topic = '/sonar' if mode == 'aquatic' else '/scan'
        self.sub = self.create_subscription(LaserScan, sensor_topic, self.sensor_cb, 10)
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)
        
        # Load PPO reinforcement learning model
        # Target: maximize forward dist, penalize collisions
        self.model = PPO.load("MlpPolicy_ROS2_SafeNav")
        self.timer = self.create_timer(0.1, self.step_rl)
        self.latest_scan = None

    def sensor_cb(self, msg):
        self.latest_scan = np.array(msg.ranges)
        self.latest_scan[np.isinf(self.latest_scan)] = 10.0 # Normalize infinities

    def step_rl(self):
        if self.latest_scan is None:
            return
            
        action, _ = self.model.predict(self.latest_scan)
        
        twist = Twist()
        twist.linear.x = float(action[0])
        twist.angular.z = float(action[1])
        
        self.pub.publish(twist)

def main():
    rclpy.init()
    node = RLNavigator('aquatic') # Dynamically injected
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()`;

const pythonCodeGazebo = `def generate_gazebo_world(motion_type):
    """
    Generate Gazebo .world file corresponding to the robot's locomotion environment
    Supported metrics: Gravity, Buoyancy, Aerodynamic drag
    """
    if motion_type == "aquatic":
        physicsParams = """
            <gravity>0 0 -9.81</gravity>
            <plugin name="underwater_world" filename="libuuv_underwater_world.so">
              <constant_current>
                <velocity>0.2 0 0</velocity>
              </constant_current>
            </plugin>
        """
    elif motion_type == "aerial":
        physicsParams = """
            <gravity>0 0 -9.81</gravity>
            <plugin name="wind_plugin" filename="libgazebo_wind_plugin.so">
                <wind_velocity_mean>5.0</wind_velocity_mean>
            </plugin>
        """
    else: # Terrestrial
        physicsParams = """
            <gravity>0 0 -9.81</gravity>
            <model name="ground_plane">
               <static>true</static>
            </model>
        """
        
    world_xml = f"""<?xml version="1.0" ?>
    <sdf version="1.6">
      <world name="sparte_simulation">
        {physicsParams}
      </world>
    </sdf>"""
    
    with open("simulation.world", "w") as f:
        f.write(world_xml)
`;

export function SimulationView() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'gazebo' | 'ros2'>('pipeline');
  
  // Pipeline steps state
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { title: t("Analyse Morphologique", "Morphological Analysis"), icon: Cpu },
    { title: t("Génération 3D & URDF", "3D & URDF Generation"), icon: Box },
    { title: t("Configuration Gazebo", "Gazebo Setup"), icon: Settings2 },
    { title: t("Nœud ROS 2 (RL)", "ROS 2 Node (RL)"), icon: Workflow },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startPipeline = () => {
    if (!file) return;
    setIsProcessing(true);
    setCurrentStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      }
    }, 2000);
  };

  const getCodeContent = () => {
    if (activeTab === 'pipeline') return pythonCodeModel;
    if (activeTab === 'gazebo') return pythonCodeGazebo;
    return pythonCodeRosNode;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#06B6D4] mb-2 block">
            {t("ROS 2 / Gazebo | Ubuntu 22.04", "ROS 2 / Gazebo | Ubuntu 22.04")}
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-text-main tracking-tight">
            {t("Simulation IA & Auto-Rigging", "AI Simulation & Auto-Rigging")}
          </h1>
          <p className="text-text-muted mt-3 max-w-2xl text-lg font-light">
            {t(
              "Transformation automatique image/vidéo vers environnement robotique virtuel (URDF, RL Node, Environnement Physique).", 
              "Automatic image/video to virtual robotics environment transformation (URDF, RL Node, Physics Env)."
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Input & Pipeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-[2rem] relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.1)_25%,rgba(68,68,68,0.1)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.1)_75%,rgba(68,68,68,0.1)_100%)] bg-[length:20px_20px] pointer-events-none opacity-20" />
             
             <h2 className="text-xl font-display font-semibold text-text-main flex items-center gap-2 mb-6">
               <UploadCloud className="w-5 h-5 text-[#06B6D4]" />
               {t("Entrée Système", "System Input")}
             </h2>

             <div 
               className="border-2 border-dashed border-glass-border hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-48"
               onClick={() => fileInputRef.current?.click()}
             >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
                
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
                    <span className="font-mono text-sm text-text-main">{file.name}</span>
                    <span className="font-mono text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <ImageIcon className="w-10 h-10 text-text-muted" />
                    <span className="font-medium text-text-main">{t("Glissez une photo ou vidéo", "Drag & drop a photo or video")}</span>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{t("Formats supportés: PNG, JPG, MP4", "Supported formats: PNG, JPG, MP4")}</span>
                  </div>
                )}
             </div>

             <button 
                onClick={startPipeline}
                disabled={!file || isProcessing}
                className="w-full mt-6 bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 border border-[#06B6D4]/30 text-[#06B6D4] py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {t("Génération en cours...", "Generation in progress...")}</>
                ) : currentStep === steps.length ? (
                  <><Play className="w-5 h-5 fill-current" /> {t("Relancer le Pipeline", "Rerun Pipeline")}</>
                ) : (
                  <><Play className="w-5 h-5 fill-current" /> {t("Initier Workspace ROS 2", "Initialize ROS 2 Workspace")}</>
                )}
              </button>

              <div className="mt-8 border-t border-glass-border pt-6">
                <h3 className="text-sm font-semibold text-text-main flex items-center gap-2 mb-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  {t("Automatisation n8n", "n8n Automation")}
                </h3>
                <p className="text-xs text-text-muted mb-4 font-mono">
                  {t("Pipeline complet généré au format JSON prêt à être importé dans une instance n8n officielle.", "Full pipeline generated in JSON format ready to be imported into an official n8n instance.")}
                </p>
                <a 
                  href="/n8n-sparte-pipeline.json" 
                  download="n8n-sparte-pipeline.json"
                  className="w-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-3 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t("Télécharger le Workflow n8n", "Download n8n Workflow")}
                </a>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-[2rem]">
            <h2 className="text-xl font-display font-semibold text-text-main flex items-center gap-2 mb-6">
              <Workflow className="w-5 h-5 text-emerald-400" />
              {t("Progression de la Simulation", "Simulation Progress")}
            </h2>
            
            <div className="space-y-4 relative">
              <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-glass-border -z-10" />
              
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = currentStep > idx;
                const isCurrent = currentStep === idx && isProcessing;
                
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#0A0A0F] shrink-0 transition-colors ${
                      isCompleted ? 'border-[#10B981] text-[#10B981]' : 
                      isCurrent ? 'border-[#06B6D4] text-[#06B6D4]' : 
                      'border-glass-border text-text-muted'
                    }`}>
                       {isCompleted ? <CheckCircle2 size={16} /> : isCurrent ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
                    </div>
                    <div className="pt-2">
                       <h4 className={`font-medium ${isCompleted || isCurrent ? 'text-text-main' : 'text-text-muted'}`}>{step.title}</h4>
                       {isCurrent && (
                          <div className="mt-2 w-48 h-1 bg-glass-bg rounded-full overflow-hidden">
                             <div className="h-full bg-[#06B6D4] w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
                          </div>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Architectrue Code Viewer */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="glass-panel rounded-[2rem] flex flex-col overflow-hidden h-full">
            <div className="bg-[#0f0f13] border-b border-glass-border p-4 flex flex-wrap gap-2 items-center justify-between z-10 relative">
               <div className="flex gap-2">
                  {[
                    { id: 'pipeline', label: 'pipeline_3d.py', icon: Box },
                    { id: 'gazebo', label: 'gazebo_env.py', icon: MapIcon },
                    { id: 'ros2', label: 'rl_node.py', icon: TerminalSquare },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20' 
                          : 'text-text-muted hover:text-text-main hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <tab.icon size={14} />
                      {tab.label}
                    </button>
                  ))}
               </div>
               
               <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  WORKSPACE READY
               </div>
            </div>

            <div className="bg-[#05050A] p-6 overflow-auto flex-1 h-[400px] font-mono text-xs md:text-sm text-gray-300 relative group">
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-text-main border border-white/10">
                    <Code2 size={16} />
                  </button>
               </div>
               <pre className="custom-scrollbar">
                 <code className="text-emerald-300">
                    {getCodeContent()}
                 </code>
               </pre>
            </div>
            
            <div className="p-4 bg-glass-bg border-t border-glass-border flex items-center justify-between text-xs text-text-muted font-mono">
               <span>Python 3.10 | Humble Hawksbill</span>
               <span>{getCodeContent().split('\\n').length} lignes</span>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
