function usePageUnloadHandler(cb?: Function) {
  const runOnPageUnLoad = (eve: BeforeUnloadEvent) => {
    eve.preventDefault()
    cb?.()
    return (eve.returnValue = '')
  }

  useEffect(() => {
    window.addEventListener('beforeunload', runOnPageUnLoad, {
      capture: true,
    })

    return () => {
      window.removeEventListener('beforeunload', runOnPageUnLoad)
    }
  }, [])
}
