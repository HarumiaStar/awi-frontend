# Script pour créer une nouvelle page de l'application react Typescript

import sys
import os


def creationPageUnique(pageName):
    # Création du dossier de la page
    cheminDesPages = "./src/Pages/"
    cheminDeLaPage = cheminDesPages + pageName
    os.mkdir(cheminDeLaPage)

    # Création du fichier index.tsx
    fichierIndex = open(cheminDeLaPage + "/index.tsx", "w")
    fichierIndex.write("import "+ pageName + " from './"+ pageName + "';\n\n")
    fichierIndex.write("export default " + pageName + ";")

    # Création du fichier <nom_page>.tsx
    fichierPage = open(cheminDeLaPage + "/" + pageName + ".tsx", "w")
    fichierPage.write("import styles from './" + pageName + ".module.css';\n")
    fichierPage.write("\n")
    fichierPage.write("export default function " + pageName + "() {\n")
    fichierPage.write("\treturn (\n")
    fichierPage.write("\t\t<div>\n")
    fichierPage.write("\t\t\t<h1 className={styles.h1}>" + pageName + "</h1>\n")
    fichierPage.write("\t\t</div>\n")
    fichierPage.write("\t);\n")
    fichierPage.write("}")

    # Création du fichier <nom_page>.module.css
    fichierCSS = open(cheminDeLaPage + "/" + pageName + ".module.css", "w")
    fichierCSS.write(".h1 {\n")
    fichierCSS.write("\tcolor: red;\n")
    fichierCSS.write("}")

    fichierCSS.close()
    fichierPage.close()
    fichierIndex.close()

    print("Page " + pageName + " créée avec succès !")


    # Edition de ./src/Pages/index.tsx
    fichierIndex = open(cheminDesPages + "index.tsx", "a")

    # fichier écrit comme :
    # import page1 from './page1';
    # import page2 from './page2';
    # ...
    # export { page1, page2, ... };

    fichierIndex.write("\n\nimport " + pageName + " from './" + pageName + "';\n")
    fichierIndex.write("export { " + pageName + " };")
    
    
def creationPageDesktopEtMobile(pageName):
    # Création du dossier de la page
    cheminDesPages = "./src/Pages/"
    cheminDeLaPage = cheminDesPages + pageName
    os.mkdir(cheminDeLaPage)

    # Création du fichier index.tsx
    fichierIndex = open(cheminDeLaPage + "/index.tsx", "w")
    fichierIndex.write("import "+ pageName + " from './"+ pageName + "';\n\n")
    fichierIndex.write("export default " + pageName + ";")

    # Création du fichier <nom_page>Dekstop.tsx
    fichierPage = open(cheminDeLaPage + "/" + pageName + "Desktop.tsx", "w")
    fichierPage.write("import styles from './" + pageName + "Desktop.module.css';\n")
    fichierPage.write("\n")
    fichierPage.write("export default function " + pageName + "Desktop() {\n")
    fichierPage.write("\treturn (\n")
    fichierPage.write("\t\t<div>\n")
    fichierPage.write("\t\t\t<h1 className={styles.h1}>" + pageName + "</h1>\n")
    fichierPage.write("\t\t</div>\n")
    fichierPage.write("\t);\n")
    fichierPage.write("}")

    # Création du fichier <nom_page>Mobile.tsx
    fichierPage = open(cheminDeLaPage + "/" + pageName + "Mobile.tsx", "w")
    fichierPage.write("import styles from './" + pageName + "Mobile.module.css';\n")
    fichierPage.write("\n")
    fichierPage.write("export default function " + pageName + "Mobile() {\n")
    fichierPage.write("\treturn (\n")
    fichierPage.write("\t\t<div>\n")
    fichierPage.write("\t\t\t<h1 className={styles.h1}>" + pageName + "</h1>\n")
    fichierPage.write("\t\t</div>\n")
    fichierPage.write("\t);\n")
    fichierPage.write("}")
    
    # Création du fichier <nom_page>Dekstop.module.css
    fichierCSS = open(cheminDeLaPage + "/" + pageName + "Desktop.module.css", "w")
    fichierCSS.write(".h1 {\n")
    fichierCSS.write("\tcolor: red;\n")
    fichierCSS.write("}")
    
    # Création du fichier <nom_page>Mobile.module.css
    fichierCSS = open(cheminDeLaPage + "/" + pageName + "Mobile.module.css", "w")
    fichierCSS.write(".h1 {\n")
    fichierCSS.write("\tcolor: red;\n")
    fichierCSS.write("}")
    
    # Création du fichier <nom_page>.module.css
    fichierCSS = open(cheminDeLaPage + "/" + pageName + ".module.css", "w")
    fichierCSS.write(".h1 {\n")
    fichierCSS.write("\tcolor: red;\n")
    fichierCSS.write("}")
    
    # Création du fichier <nom_page>.tsx
    fichierPage = open(cheminDeLaPage + "/" + pageName + ".tsx", "w")
    fichierPage.write("import styles from './" + pageName + ".module.css';\n")
    fichierPage.write("import { DesktopOnly, MobileOnly } from '../../Utils/IsMobile';")
    fichierPage.write("import " + pageName + "Desktop from './" + pageName + "Desktop';\n")
    fichierPage.write("import " + pageName + "Mobile from './" + pageName + "Mobile';\n")
    fichierPage.write("\n")
    fichierPage.write("export default function " + pageName + "() {\n")
    fichierPage.write("\treturn (\n")
    fichierPage.write("\t\t<>\n")
    fichierPage.write("\t\t\t<MobileOnly>\n") 
    fichierPage.write("\t\t\t\t<" + pageName + "Mobile />\n")
    fichierPage.write("\t\t\t</MobileOnly>\n")
    fichierPage.write("\t\t\t<DesktopOnly>\n") 
    fichierPage.write("\t\t\t\t<" + pageName + "Desktop />\n") 
    fichierPage.write("\t\t\t</DesktopOnly>\n")
    fichierPage.write("\t\t</>\n")
    fichierPage.write("\t);\n")
    fichierPage.write("}")
    
    fichierCSS.close()
    fichierPage.close()
    fichierIndex.close()

    # Edition de ./src/Pages/index.tsx
    fichierIndex = open(cheminDesPages + "index.tsx", "a")
    fichierIndex.write("\n\nimport " + pageName + " from './" + pageName + "';\n")
    fichierIndex.write("export { " + pageName + " };")
    
    fichierIndex.close()
    
    
    
# Récupération du nom de la page
if (not(len(sys.argv) == 2)) & (not(len(sys.argv) == 3)):
    print("Usage: python3 newPage.py <nom_page> [desktop/mobile]")
    sys.exit()
    
pageName = sys.argv[1]

if len(sys.argv) == 3:
    creationPageDesktopEtMobile(pageName)
else:
    creationPageUnique(pageName)