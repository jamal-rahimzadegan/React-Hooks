interface Params {
  syncKey: string
  cb: Function
  defaultValue?: any
}

export default function useCrossTabSync(params: Params): Function {
  const { syncKey, cb, defaultValue = null } = params
  const [syncState, setSyncState] = useState(defaultValue)
  const isNewSession = useRef(true)

  const handleIncomingMsg = (e: StorageEvent) => {
    const { key, newValue } = e
    if (key !== syncKey) return

    cb?.()
    setSyncState(JSON.parse(newValue || ''))
  }

  const handleNewSession = () => {
    if (isNewSession.current) {
      const currentState = localStorage.getItem(syncKey)

      if (currentState) setSyncState(JSON.parse(currentState))
      else setSyncState(defaultValue)

      isNewSession.current = false

      return
    }

    try {
      localStorage.setItem(syncKey, JSON.stringify(syncState))
    } catch (error) {
      console.error(`--- err in new session ----> `, error)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', handleIncomingMsg)
    return () => window.removeEventListener('storage', handleIncomingMsg)
  }, [syncKey, setSyncState])

  useEffect(handleNewSession, [syncState, syncKey, defaultValue])

  return setSyncState
}

// Usage:
// const setSyncState = useCrossTabSync({
//   syncKey: 'sync',
//   cb: () => {
//     //  DO whatever you want with the other tabs
//     const root = document.getElementById('root')
//     root.style.opacity = '0.5'
//     root.style.pointerEvents = 'none'
//   },
// })

// <>
// <button onClick={() => setSyncState('update ' + Math.random())}>
// Update
// </button>
// <button onClick={() => console.log(`--- result ----> `, syncState)}>
// Get
// </button>
// </>
