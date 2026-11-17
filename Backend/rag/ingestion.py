import os
from dotenv import load_dotenv

from langchain_community.document_loaders import DirectoryLoader, TextLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings

from langchain_qdrant import QdrantVectorStore


load_dotenv()

# Configuration
KNOWLEDGE_BASE_PATH = "knowledge_base"
QDRANT_URL = "http://localhost:6333"
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
        model="nvidia/nemotron-3-embed-1b",
        api_key=os.getenv("NVIDIA_API_KEY")
    )

    return embeddings


# 4. Store documents in Qdrant
def store_in_qdrant(chunks, embeddings):

    vector_store = QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url=QDRANT_URL,
        collection_name=COLLECTION_NAME,
        force_recreate=True
    )

    print("Documents successfully stored in Qdrant!")

    return vector_store


# Main execution
if __name__ == "__main__":

    documents = load_documents()

    chunks = split_documents(documents)

    embeddings = get_embeddings()

    vector_store = store_in_qdrant(chunks, embeddings)