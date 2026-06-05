"use client";

import { QRCodeSVG } from 'qrcode.react';

export default function MfaSetupQr({ otpAuthUri }: { otpAuthUri: string }) {
  
  if(otpAuthUri === '') {
    return <div>QR Kod oluşturulamadı.</div>;
  }

  return (
      <div className="flex items-center justify-center h-full w-full border border-black/10 bg-background dark:border-white/15 rounded-2xl p-4">
        <div className="text-center">
          <QRCodeSVG value={otpAuthUri} />
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
            QR Kod
          </p>
        </div>
      </div>
    
  );
}
