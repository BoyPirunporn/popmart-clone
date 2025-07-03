'use client';

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './emotionCache';
import App from './components/App';
import { compatibility } from './Compatibility';

const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }: { children: React.ReactNode; }) {
    const [mounted, setMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    compatibility();
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <AntdConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
                    <CssBaseline />
                    <App>
                        {children}
                    </App>
                </AntdConfigProvider>

            </ThemeProvider>
        </CacheProvider>
    );
}
