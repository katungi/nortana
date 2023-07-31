
import SpinCortana from "@/components/voice/spin-state";

export default function VoiceCommand() {
  return (
    <div className='flex flex-col'>
      <SpinCortana listeningMode="Idle" />
      <div className='mt-64 ml-40 text-gray-100 font-bold'>
        <p>Say "Hey Cortana" to get started</p>
      </div>
    </div>
  )
}