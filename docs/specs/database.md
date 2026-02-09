specs/database.md
Este documento fuerza al agente a usar las capacidades nativas de Oracle Autonomous Database 26ai, evitando que instale librerías innecesarias como ChromaDB o Pinecone.
# 🗄️ Database Specifications (Oracle AI Database 26ai)

> **DIRECTIVA:** No utilizar bases de datos vectoriales externas. Usar las capacidades nativas de Oracle Autonomous Database 26ai.

## 1. Conexión y Esquema
*   **Tipo:** Oracle Autonomous Transaction Processing (ATP) Serverless [7].
*   **Versión:** Oracle Database 23ai / 26ai [3].
*   **Driver:** Usar `oracledb` (Thin mode) para Python/Node.js.

## 2. Búsqueda Vectorial (AI Vector Search)
Utilizar el tipo de dato nativo `VECTOR` para embeddings. No implementar lógica de distancia del coseno en código aplicación; usar SQL nativo.

```sql
-- Ejemplo de Búsqueda Semántica Nativa
SELECT nombre, descripcion
FROM contenido_episodios
ORDER BY VECTOR_DISTANCE(embedding_vector, :query_vector, COSINE)
FETCH FIRST 5 ROWS ONLY;
• Generación de Embeddings: Usar modelos ONNX cargados en la base de datos o llamadas a API gestionadas por Oracle, no generar embeddings en el servidor de aplicación (ahorro de CPU).
3. Select AI (Lenguaje Natural a SQL)
Para el Chatbot, utilizar Oracle Select AI. No construir cadenas de LangChain complejas para Text-to-SQL.
• Configuración: Usar el perfil AI_PROFILE configurado en la base de datos que conecta con OpenAI/Cohere.
• Uso:
• RAG (Retrieval Augmented Generation): Configurar DBMS_CLOUD_AI para que use las tablas de ordenanzas_municipales como contexto para las respuestas generadas.
4. Restricciones de la Capa Gratuita
• Almacenamiento: Límite estricto de 20 GB de datos Exadata.
• Inactividad: Implementar un "keep-alive" (query ligero) cada 6 días para evitar que la base de datos se detenga automáticamente por inactividad (política de 7 días).

---
