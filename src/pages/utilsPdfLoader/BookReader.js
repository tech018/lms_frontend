import React, { useState } from 'react';
import Loader from './Loader';

import { Document, Page, pdfjs } from 'react-pdf';
import Panel from './Panel';
import {Helmet} from "react-helmet";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const BookReader = ({match,history}) => {
  const pdf = match.params.pdfName
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }



  return (
    <div style={{marginTop:'75px'}} className="bg-info">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Books | Learn and Share Online English Education</title>
            </Helmet>
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <Panel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={`/pdfFiles/${pdf}`}
         
        />
        <Document
          file={`/pdfFiles/${pdf}`}
          onLoadSuccess={onDocumentLoadSuccess}
          className="mb-3"
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
    </div>
  );
};

export default BookReader;
