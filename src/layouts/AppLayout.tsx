import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/global/GlobalStyle';
import theme from '@/styles/theme';
import { size, spacing } from '@/styles/tokens/spacing';
import { white } from '@/styles/tokens/color';
import { Header } from '@/components/layout/header/Header';
import type { HeaderProps } from '@/components/layout/header/Header';
import { Docker } from '@/components/layout/docker/Docker';
import type { DockProps } from '@/components/layout/docker/Docker';
import { Floating } from '@/components/layout/floating/Floating';
import type { FloatingProps } from '@/components/layout/floating/Floating';
import { PortalProvider } from '@/contexts/PortalContext';

// =========================
// Layout constants
// =========================

const MAX_WIDTH = '500px';
const DOCKER_HEIGHT = size.xs; // 56px

// =========================
// Types
// =========================

export interface AppLayoutProps {
    headerProps: HeaderProps;
    dockerProps?: DockProps;
    floatingProps?: FloatingProps;
    children: React.ReactNode;
}

// =========================
// Styled
// =========================

const Frame = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  min-height: 100dvh;
  margin: 0 auto;
  background: ${white};
  position: relative;
  overflow-x: hidden;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08);
`;

const HeaderFixed = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MAX_WIDTH};
  z-index: 50;
  background: ${white};
`;

const Main = styled.main<{ $hasDocker: boolean }>`
  padding-top: ${size.xs};
  padding-bottom: ${({ $hasDocker }) =>
          $hasDocker ? `calc(${DOCKER_HEIGHT} + ${spacing.lg})` : '0'};
`;

const DockerFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MAX_WIDTH};
  z-index: 50;
`;

const FloatingFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MAX_WIDTH};
  z-index: 49;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const PortalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${MAX_WIDTH};
  height: 100dvh;
  pointer-events: none;
  z-index: 200;

  & > * {
    pointer-events: auto;
  }
`;

// =========================
// Component
// =========================

export const AppLayout = ({
                              headerProps,
                              dockerProps,
                              floatingProps,
                              children,
                          }: AppLayoutProps) => {
    const floatingBottom = dockerProps
        ? `calc(${DOCKER_HEIGHT} + ${spacing.lg})`
        : spacing.xl;

    const portalRef = React.useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <PortalProvider target={portalRef}>
                <HeaderFixed>
                    <Header {...headerProps} />
                </HeaderFixed>
                <Frame>
                    <Main $hasDocker={!!dockerProps}>
                        {children}
                    </Main>
                </Frame>

                {dockerProps && (
                    <DockerFixed>
                        <Docker {...dockerProps} />
                    </DockerFixed>
                )}

                {floatingProps && (
                    <FloatingFixed>
                        <Floating
                            {...floatingProps}
                            bottom={floatingBottom}
                            right={spacing.md}
                        />
                    </FloatingFixed>
                )}

                <PortalContainer ref={portalRef} />
            </PortalProvider>
        </ThemeProvider>
    );
};

export default AppLayout;