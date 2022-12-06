import fs from 'fs';
import path from 'path';

function createDirIfNotExists(filePath: string) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

async function ListDirectory(dir: string): Promise<string[] | null> {
  try {
    const files =  await fs.promises.readdir(dir);
    let filenames=new Array<string>();
    files.forEach((f)=>{
        filenames.push(path.basename(f));
    });
    return filenames;
  }
  catch (error){
    console.log(`Error: ${error}`);
    return null
  }
}

export default { 
    ListDirectory,
    createDirIfNotExists
};
