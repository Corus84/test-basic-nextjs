import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { IdObject } from '../../model/id-object';
import { PostParam } from '../../model/post-param';
import { PostData } from '../../model/post-data';

export async function getStaticPaths() {
    const paths: PostParam[] = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const postData: IdObject = getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }: { postData: PostData }): JSX.Element {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    )
}
