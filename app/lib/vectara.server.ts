import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Load environment variables from .env file

const VECTARA_CUSTOMER_ID = process.env.VECTARA_CUSTOMER_ID || '';
const VECTARA_CORPUS_ID = "4";
const VECTARA_API_KEY = process.env.VECTARA_API_KEY || '';
const VECTARA_INDEXING_URL = "https://api.vectara.io/v1/index";



interface EventData {
    title: string;
    content: string;
    location: string;
    company: string;
    apply_url: string;
    experience_level: string;
    job_type: string;
    slug: string;
}

export async function sendToVectara(data: EventData): Promise<void> {
    // Construct the document payload for Vectara Indexing API
    const document = {
        customerId: VECTARA_CUSTOMER_ID,
        corpusId: VECTARA_CORPUS_ID,
        document: {
            documentId: data.slug,
            title: data.title,
            description: data.content,
            metadataJson: JSON.stringify({
                company: data.company,
                location: data.location,
                experience_level: data.experience_level,
                job_type: data.job_type,
                link: data.apply_url,
                date_posted: new Date().toLocaleDateString()
            })
        }
    };

    try {
        // Send the document to Vectara for indexing
        const response = await axios.post(
            VECTARA_INDEXING_URL,
            document,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': VECTARA_API_KEY
                }
            }
        );

        if (response.status === 200) {
            console.log("Successfully indexed the job posting to Vectara.");
        } else {
            console.log(`Failed to index the job posting to Vectara: ${response.data}`);
        }
    } catch (error) {
        console.error(`Error while indexing to Vectara: ${error}`);
    }
}