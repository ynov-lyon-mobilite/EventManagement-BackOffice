import Layout from "../components/layout/Layout";
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
       welcome
        <Link href="/test">
            <a>test</a>
        </Link>
    </Layout>
  )
}
