import * as vscode from "vscode";
import fs = require("fs");
import path = require("path");
import toast from "./toast";
const camelCase = require('camelcase');
export default async function(fsPath: string) {
  try {
    let name = await vscode.window.showInputBox({
      prompt: "请输入组件名称"
    });
    name = (name || "").trim();
    if (!name) {
      return toast.error("请输入组件名称");
    }
    const pick = await vscode.window.showQuickPick(["yes", "no"], {
      placeHolder: "是否需要新建文件夹"
    });
    let filename = name;
    if (pick === "yes") {
      fs.mkdirSync(path.resolve(fsPath, name));
      filename = `${name}/index`;
    }
    const filePath = path.resolve(fsPath, `${filename}.vue`);
    
    const componentName = camelCase(name, {
      pascalCase: true
    })
    const str = `<template>
  <div class="${name}-wrap"></div>
</template>

<script>
export default {
  name: '${componentName}'
}
</script>
<style lang="scss" scoped></style>
`;
    fs.writeFileSync(filePath, str, "utf8");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
}
