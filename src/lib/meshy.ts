export interface MeshyTaskResponse {
  result?: string; // Task ID
  error?: string;
  message?: string;
}

export interface MeshyStatusResponse {
  status: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED';
  progress: number;
  model_urls?: {
    glb?: string;
    fbx?: string;
    obj?: string;
  };
  error?: string;
}

export async function generate3DFromAsset(sourceUrl: string, type: 'image' | 'video' = 'image'): Promise<string> {
  const response = await fetch('/api/meshy/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source_url: sourceUrl, type })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to start Meshy task');
  }

  const data: MeshyTaskResponse = await response.json();
  if (data.error || data.message) {
    throw new Error(data.error || data.message || 'Error from Meshy API');
  }
  
  if (!data.result) {
    throw new Error('No task ID returned');
  }

  return data.result;
}

export async function pollTaskStatus(taskId: string, onProgress?: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/meshy/status/${taskId}`);
        if (!response.ok) {
           clearInterval(interval);
           reject(new Error('Failed to fetch status'));
           return;
        }

        const data: MeshyStatusResponse = await response.json();
        
        if (onProgress) {
          onProgress(data.progress || 0);
        }

        if (data.status === 'SUCCEEDED') {
          clearInterval(interval);
          if (data.model_urls?.glb) {
             resolve(data.model_urls.glb);
          } else {
             reject(new Error('No GLB URL found in result'));
          }
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          reject(new Error('Task processing failed'));
        }
      } catch (err) {
        clearInterval(interval);
        reject(err);
      }
    }, 5000); // poll every 5s
  });
}
