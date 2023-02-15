interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
    // const { isSnackbarOpen, setIsSnackbarOpen, message } = useSnackbarOpenStore()

    return <div className='h-full min-w-[300px] w-full bg-white'>
        {children}
        {/*<BottomCenterSnackbar isSnackbarOpen={isSnackbarOpen} setIsSnackbarOpen={setIsSnackbarOpen} message={message} />*/}
    </div>
}

export default Layout