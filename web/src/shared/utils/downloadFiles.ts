import axios from 'axios';

interface DownloadFile {
  name: string;
  url: string;
}

const downloadFiles = (files: DownloadFile[]) => {
  files.map((file, index) =>
    setTimeout(async () => {
      const { data } = await axios.get(file.url, { responseType: 'blob' });
      const attachmentURL = URL.createObjectURL(new Blob([data]));

      const regex = /[^.]+$/;

      const aux = file.name.match(regex);

      const anchor = document.createElement('a');
      anchor.href = attachmentURL;
      anchor.download =
        aux[0] === aux.input ? `${file.name}.${file.url.match(regex)[0]}` : file.name;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(attachmentURL);
    }, index * 200),
  );
};

export default downloadFiles;
