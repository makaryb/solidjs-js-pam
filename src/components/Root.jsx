import { setDebug } from '@tma.js/sdk';
import { DisplayGate, SDKProvider, useLaunchParams } from '@tma.js/sdk-solid';

import { App } from '~/components/App.jsx';
import { TonConnectUIProvider } from '~/tonconnect/TonConnectUIProvider.jsx';

/**
 * @param {{ error: unknown }} props
 * @return {import('solid-js').JSXElement}
 */
function Err(props) {
  return (
    <div>
      <p>An error occurred while initializing the SDK</p>
      <blockquote>
        <code>
          {props.error instanceof Error
            ? props.error.message
            : JSON.stringify(props.error)}
        </code>
      </blockquote>
    </div>
  );
}

function Loading() {
  return <div>Application is loading</div>;
}

export function Root() {
  if (useLaunchParams().startParam === 'debug') {
    setDebug(true);
    import('eruda').then((lib) => lib.default.init());
  }

  return (
    <TonConnectUIProvider
      manifestUrl={new URL('tonconnect-manifest.json', window.location.href).toString()}
    >
      <SDKProvider options={{ acceptCustomStyles: true, cssVars: true, complete: true }}>
        <DisplayGate error={Err} loading={Loading} initial={Loading}>
          <App/>
        </DisplayGate>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}
