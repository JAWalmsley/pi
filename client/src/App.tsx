import React, {useEffect, useState} from 'react';
import './App.css';
import Quagga from 'quagga';
import styled from "styled-components";

function App() {
  const [company, setCompany] = useState("test company");
  const [score, setScore] = useState("test score");
  const [blurb, setBlurb] = useState("test blurb");
  const [upc, setUpc] = useState(null);

  useEffect(() => {
    Quagga.init(
      {
        numOfWorkers: 4,
        debug: true,
        locate: true,
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#qr-reader'),
        },
        decoder: {
          readers: ['upc_reader'],
          debug: {
            drawBoundingBox: true,
            drawScanline: true,
          },
        },
      },
      function (err: any) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();
      }
    );

    Quagga.onDetected(function (result: any) {
      const code = result.codeResult.code;
      // @ts-ignore
      if (!(code in upc)) {
        console.log('bad read');
        return;
      }
      console.log(code);
      // @ts-ignore
      console.log(upc[code].company);
      // @ts-ignore
      fetch('https://nftstorage.link/ipfs/' + upc[code].ipfs)
        .then((response) => response.json())
        .then((json) => {
          setCompany(json.name);
          setScore(json.score);
          setBlurb(json.blurb);
        });
    });
  }, []);

  useEffect(() => {
    fetch('UPC.json')
      .then((response) => response.json())
      .then((json) => (setUpc(json)));
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>{company}</p>
        <p>{score}</p>
        <p>{blurb}</p>
      </header>
      <QrReader id="qr-reader"></QrReader>
    </div>
  );
}

const QrReader = styled.div`
  video {
    height: 60%;
  }
`;

export default App;
