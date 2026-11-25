import os
from dotenv import load_dotenv

from langchain_community.document_loaders import DirectoryLoader, TextLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings

from langchain_qdrant import QdrantVectorStore


load_dotenv()

# Configuration (Grab from environment variables / .env)
KNOWLEDGE_BASE_PATH = "knowledge_base"
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = "ncet_knowledge"


# 1. Load documents
def load_documents():

    loader = DirectoryLoader(
        KNOWLEDGE_BASE_PATH,
        glob="*.txt",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"}
    )

    documents = loader.load()

    print(f"Total documents loaded: {len(documents)}")

    return documents


# 2. Split documents
def split_documents(documents):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_documents(documents)

    print(f"Total chunks created: {len(chunks)}")

    return chunks


# 3. Generate embeddings
def get_embeddings():

    embeddings = NVIDIAEmbeddings(
        model="nvidia/nemotron-3.5-embed-1b",
        api_key=os.getenv("NVIDIA_API_KEY")
    )

    return embeddings


# 4. Store documents in Qdrant
def store_in_qdrant(chunks, embeddings):

    vector_store = QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY,  # Added this for Qdrant Cloud auth
        collection_name=COLLECTION_NAME,
        force_recreate=True,
        timeout=60,       # Increase HTTP timeout from 5s to 60s
        batch_size=10,    # Upload 10 chunks at a time instead of all 63 at once
    )

    print("Documents successfully stored in Qdrant Cloud!")

    return vector_store





# Main execution
if __name__ == "__main__":

    documents = load_documents()

    chunks = split_documents(documents)

    embeddings = get_embeddings()

    vector_store = store_in_qdrant(chunks, embeddings)





