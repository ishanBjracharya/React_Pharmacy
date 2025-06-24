import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', '127.0.0.1', 'utfs.io'], // add IP in case you use it
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })