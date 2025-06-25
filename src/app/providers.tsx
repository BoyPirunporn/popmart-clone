'use client';

import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './emotionCache';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import App from './components/App';

const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }: { children: React.ReactNode }) {
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
