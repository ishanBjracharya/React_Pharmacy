import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io', '4jvt4vl423.ufs.sh'], // add IP in case you use it
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })