export const readFile = (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file);
  });
};
