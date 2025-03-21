<template>
    <div class="max-w-[1440px] mx-auto pt-12 flex mt-10">
      <!-- Left Sidebar -->
      <div class="w-72 fixed h-[calc(100vh-4rem)] p-4 border-r bg-white">
        <a href="/" data-readdy="true" class="block mb-6">
          <button class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 cursor-pointer whitespace-nowrap !rounded-button">
            <font-awesome-icon icon="arrow-left" />
            <span>Back</span>
          </button>
        </a>
        
        <div class="mb-6">
          <input v-model="projectName" type="text" class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Project Name">
        </div>
  
        <div class="space-y-4">
          <div v-for="track in tracks" :key="track.id" class="bg-gray-50 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <button @click="track.muted = !track.muted" class="text-sm !rounded-button cursor-pointer" :class="track.muted ? 'text-gray-400' : 'text-indigo-600'">
            <font-awesome-icon class="text-indigo-600" :icon="track.muted ? 'volume-mute' : 'volume-up'"/>
  
                
                </button>
                <span class="text-sm font-medium">{{ track.name }}</span>
              </div>
              <button @click="track.solo = !track.solo" class="px-2 py-1 text-xs !rounded-button cursor-pointer" :class="track.solo ? 'bg-indigo-600 text-white' : 'bg-gray-200'">
                S
              </button>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-24 bg-gray-200 rounded-full h-1">
                <div class="bg-indigo-600 h-1 rounded-full" :style="{ width: `${track.volume}%` }"></div>
              </div>
              <span class="text-xs text-gray-500">{{ track.volume }}%</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="flex-1 ml-72 p-6 pr-[120px]">
        <!-- Transport Controls -->
        <div class="rounded-xl p-4 shadow-sm mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <button class="text-2xl text-indigo-600 cursor-pointer !rounded-button" @click="togglePlay">
                <font-awesome-icon class="text-indigo-600" :icon="isPlaying ? 'pause' : 'play'"/>
              </button>
              <button class="text-2xl text-gray-600 cursor-pointer !rounded-button">
                <font-awesome-icon icon="stop" class="text-indigo-600" />
  
              </button>
              <button class="text-2xl text-gray-600 cursor-pointer !rounded-button" @click="startRecording">
                <font-awesome-icon 
    :icon="['fas', 'circle']"
    :class="isRecording ? 'text-red-500' : 'text-gray-600'"
  />
  
              </button>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span>{{ currentTime }}</span>
              <span class="text-gray-400">/</span>
              <span>{{ totalTime }}</span>
            </div>
          </div>
          
          <!-- Waveform -->
          <div ref="waveformContainer" class="w-full h-32 bg-gray-50 rounded-lg"></div>
        </div>
  
        <!-- Effects Rack -->
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <h3 class="font-semibold mb-4">Effects</h3>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="effect in effects" :key="effect.id" class="p-4 border rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <span class="font-medium">{{ effect.name }}</span>
                <button @click="effect.enabled = !effect.enabled" class="text-sm !rounded-button cursor-pointer" :class="effect.enabled ? 'text-indigo-600' : 'text-gray-400'">
                <font-awesome-icon icon="power-off" class="text-indigo-600" />
  
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="param in effect.params" :key="param.name" class="space-y-1">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">{{ param.name }}</span>
                    <span>{{ param.value }}{{ param.unit }}</span>
                  </div>
                  <input type="range" v-model="param.value" :min="param.min" :max="param.max" class="w-full">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Right Sidebar -->
      <div class="w-80 fixed right-0 h-[calc(100vh-4rem)] p-4 border-l bg-white overflow-y-auto">
        <h3 class="font-semibold mb-4">Project Files</h3>
        <div class="space-y-3">
          <div v-for="file in projectFiles" :key="file.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="music" class="text-indigo-600" />
              <div>
                <p class="text-sm font-medium">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ file.duration }}</p>
              </div>
            </div>
            <button class="text-gray-600 hover:text-indigo-600 cursor-pointer !rounded-button">
              <font-awesome-icon icon="plus" class="text-indigo-600" />
            </button>
          </div>
        </div>
        <button
              class="px-4 py-2 mt-6 bg-indigo-600 text-white text-sm !rounded-button whitespace-nowrap"
            >
              <i class="fas fa-cloud-upload-alt mr-2"></i>Export Project
            </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import { useAppStore } from '../store';
  
  
  const userAvatar = 'https://public.readdy.ai/ai/img_res/9e0ffeaa3ad3cf68e2c0e1ba9986071e.jpg';
  const projectName = ref('New Project');
  const isPlaying = ref(false);
  const isRecording = ref(false);
  const currentTime = ref('00:00');
  const totalTime = ref('03:45');
  
  const tracks = ref([
    { id: 1, name: 'Lead Vocals', volume: 75, muted: false, solo: false },
    { id: 2, name: 'Backing Vocals', volume: 65, muted: false, solo: false },
    { id: 3, name: 'Guitar', volume: 80, muted: false, solo: false },
    { id: 4, name: 'Bass', volume: 70, muted: false, solo: false },
    { id: 5, name: 'Drums', volume: 85, muted: false, solo: false }
  ]);
  
  const effects = ref([
    {
      id: 1,
      name: 'Reverb',
      enabled: true,
      params: [
        { name: 'Room Size', value: 50, min: 0, max: 100, unit: '%' },
        { name: 'Damping', value: 30, min: 0, max: 100, unit: '%' }
      ]
    },
    {
      id: 2,
      name: 'EQ',
      enabled: true,
      params: [
        { name: 'Low', value: 0, min: -12, max: 12, unit: 'dB' },
        { name: 'Mid', value: 0, min: -12, max: 12, unit: 'dB' },
        { name: 'High', value: 0, min: -12, max: 12, unit: 'dB' }
      ]
    },
    {
      id: 3,
      name: 'Compressor',
      enabled: false,
      params: [
        { name: 'Threshold', value: -20, min: -60, max: 0, unit: 'dB' },
        { name: 'Ratio', value: 4, min: 1, max: 20, unit: ':1' }
      ]
    }
  ]);
  
  const projectFiles = ref([
    { id: 1, name: 'Vocal Take 1', duration: '3:45' },
    { id: 2, name: 'Guitar Solo', duration: '2:30' },
    { id: 3, name: 'Drum Loop', duration: '0:30' },
    { id: 4, name: 'Bass Line', duration: '3:45' },
    { id: 5, name: 'Synth Pad', duration: '4:15' }
  ]);
  
  const togglePlay = () => {
    isPlaying.value = !isPlaying.value;
  };
  
  const startRecording = () => {
    isRecording.value = !isRecording.value;
  };
  
  onMounted(() => {
    const waveformContainer = document.getElementById('waveformContainer') as HTMLDivElement; // Or use the ref if renamed
    const waveformChart = echarts.init(waveformContainer);
  
    const option = {
      animation: false,
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        show: false,
        data: Array.from({ length: 100 }, (_, i) => i),
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [{
        data: Array.from({ length: 100 }, () => Math.random() * 2 - 1),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#4F46E5',
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(79, 70, 229, 0.2)',
            }, {
              offset: 1,
              color: 'rgba(79, 70, 229, 0)',
            }],
          },
        },
      }],
    };
  
    waveformChart.setOption(option);
  });
  </script>
  
  <style scoped>
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #E5E7EB;
    border-radius: 2px;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #4F46E5;
    border-radius: 50%;
    cursor: pointer;
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #4F46E5;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
  </style>
  
  