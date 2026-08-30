import os
from pathlib import Path
from PIL import Image

def procesar_imagenes(directorio_origen, ancho_nuevo, calidad=80):
    directorio = Path(directorio_origen)
    
    extensiones = ['*.jpg', '*.jpeg', '*.png']
    archivos = []
    
    for ext in extensiones:
        archivos.extend(directorio.rglob(ext))
        archivos.extend(directorio.rglob(ext.upper()))
        
    if not archivos:
        print("No se encontraron imágenes JPG o PNG en el directorio.")
        return

    print(f"Se encontraron {len(archivos)} imágenes. Iniciando proceso...\n")

    for ruta_img in archivos:
        ruta_destino = ruta_img.with_suffix('.webp')

        if ruta_destino.exists():
            print(f"⏩ Saltando: {ruta_img.name} (Ya existe)")
            continue

        try:
            with Image.open(ruta_img) as img:
                ancho_original, alto_original = img.size
                
                # Calcular la proporción para no deformar la imagen
                proporcion = ancho_nuevo / ancho_original
                alto_nuevo = int(alto_original * proporcion)
                
                # Image.Resampling.LANCZOS aplica el mejor algoritmo para que no pierda nitidez al cambiar de tamaño
                img = img.resize((ancho_nuevo, alto_nuevo), Image.Resampling.LANCZOS)

                # Asegurar el modo de color correcto para WebP
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGBA')
                
                img.save(ruta_destino, 'WEBP', quality=calidad)
                print(f"✅ Éxito: {ruta_img.name} -> {ruta_destino.name} ({ancho_nuevo}x{alto_nuevo}px)")
                
        except Exception as e:
            print(f"❌ Error al procesar {ruta_img.name}: {e}")

if __name__ == "__main__":
    print("--- Convertidor y Redimensionador a WebP ---")
    
    # 1. Pedir ruta
    ruta = input("Ingresa la ruta de la carpeta (Enter para la actual): ").strip()
    if not ruta:
        ruta = "."
        
    # 2. Pedir ancho asegurando que sea un número válido
    while True:
        try:
            ancho = int(input("Ingresa el ancho deseado en píxeles (ej. 800): "))
            if ancho > 0:
                break
            print("El ancho debe ser mayor a 0.")
        except ValueError:
            print("Por favor, ingresa un número entero (sin comas ni puntos).")

    # 3. Ejecutar
    procesar_imagenes(ruta, ancho_nuevo=ancho, calidad=80)
    print("\n¡Proceso terminado!")