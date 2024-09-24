// import React from 'react'
import voices from '../MockData/voices.json'

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-90 overflow-y-auto bg-black p-4">
      <h2 className="text-lg font-bold mb-4 text-green-500">Voices</h2>
      <ul className="space-y-4">
        {voices.map((voice) => (
          <li
            key={voice.voice_id}
            className="border border-green-500 rounded-lg p-3 hover:bg-green-900 transition-colors duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {voice.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-500">
                    {voice.name}
                  </span>
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                    {voice.labels.accent}
                  </span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  {voice.labels.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(voice.labels).map(
                    ([key, value]) =>
                      key !== 'accent' &&
                      key !== 'description' && (
                        <span
                          key={key}
                          className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full"
                        >
                          {value}
                        </span>
                      ),
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
