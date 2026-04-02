const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1) <Button asChild...><Link ...> ... </Link></Button>
  //    => <Button render={<Link ... />} ...> ... </Button>
  content = content.replace(/<Button([^>]*) asChild([^>]*)>\s*<Link([^>]*)>([\s\S]*?)<\/Link>\s*<\/Button>/g, 
    (match, p1, p2, p3, p4) => {
      // Re-assemble putting render on Button
      return `<Button${p1}${p2} render={<Link${p3} />}>${p4}</Button>`;
    }
  );

  // 2) <Button asChild...><a ...> ... </a></Button>
  content = content.replace(/<Button([^>]*) asChild([^>]*)>\s*<a([^>]*)>([\s\S]*?)<\/a>\s*<\/Button>/g, 
    (match, p1, p2, p3, p4) => {
      return `<Button${p1}${p2} render={<a${p3} />}>${p4}</Button>`;
    }
  );
  
  // 3) <DialogTrigger asChild...><Button ...> ... </Button></DialogTrigger>
  content = content.replace(/<DialogTrigger([^>]*) asChild([^>]*)>\s*<Button([^>]*)>([\s\S]*?)<\/Button>\s*<\/DialogTrigger>/g, 
    (match, p1, p2, p3, p4) => {
      return `<DialogTrigger${p1}${p2} render={<Button${p3} />}>${p4}</DialogTrigger>`;
    }
  );

  // 4) <DropdownMenuTrigger asChild...><Button ...> ... </Button></DropdownMenuTrigger>
  content = content.replace(/<DropdownMenuTrigger([^>]*) asChild([^>]*)>\s*<Button([^>]*)>([\s\S]*?)<\/Button>\s*<\/DropdownMenuTrigger>/g, 
    (match, p1, p2, p3, p4) => {
      return `<DropdownMenuTrigger${p1}${p2} render={<Button${p3} />}>${p4}</DropdownMenuTrigger>`;
    }
  );

  // 5) Remove remaining asChild that we missed
  content = content.replace(/ asChild/g, '');

  // 6) Also replace onValueChange to undefined dispatch types in Select
  content = content.replace(/onValueChange=\{\(e\) => ([^}]+)\}/g, 'onValueChange={(value) => { if(value) $1(value) }}');
  content = content.replace(/onValueChange=\{([^\s}]+)\}/g, 'onValueChange={(val) => { if(val) $1(val) }}');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    console.log('Fixed', file);
  }
});

console.log('Total fixed:', changed);
