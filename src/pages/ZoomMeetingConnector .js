import React, { useEffect, useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeetingConnector = () => {
  const zoomMeetingRef = useRef(null);

  useEffect(() => {
    ZoomMtg.i18n.load('en-US');
    ZoomMtg.i18n.reload('en-US');
  }, []);

  const joinMeeting = () => {
    const meetConfig = {
      apiKey: 't2uXTgf4A7IyKU3ffQpsZHHnQ9Uuvo3nV65v',
      meetingNumber: '71366878548', // Your static meeting number
      userName: 'Test User',
      userEmail: 'user@example.com',
      passWord: 'X9wpbiadBVqYkovkKjYWk54eEFoc1T.1', // If required
      role: 0, // 0 for attendee, 1 for host
    };

    ZoomMtg.generateSDKSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: 'bVTPg9Ie3vq77VGBEnha8hH5EakUsDttaxW5', // Be cautious with this in production
      role: meetConfig.role,
      success: (signature) => {
        ZoomMtg.init({
          leaveUrl: window.location.origin,
          success: () => {
            ZoomMtg.join({
              signature: signature.result,
              meetingNumber: meetConfig.meetingNumber,
              userName: meetConfig.userName,
              apiKey: meetConfig.apiKey,
              userEmail: meetConfig.userEmail,
              passWord: meetConfig.passWord,
              success: () => {
                console.log('Joined meeting successfully');
              },
              error: (error) => {
                console.error('Failed to join meeting:', error);
              }
            });
          },
          error: (error) => {
            console.error('Failed to initialize Zoom:', error);
          }
        });
      },
      error: (error) => {
        console.error('Failed to generate signature:', error);
      }
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zoom Meeting Connector</h1>
      <button onClick={joinMeeting} className="w-full mb-4">
        Join Zoom Meeting
      </button>
      <div ref={zoomMeetingRef} id="zmmtg-root"></div>
    </div>
  );
};

export default ZoomMeetingConnector;