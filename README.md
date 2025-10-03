# HLS Video Player Dashboard

A React-based dashboard for streaming HLS (HTTP Live Streaming) video content with support for multiple concurrent video streams.

## Features

- **Multi-stream HLS playback**: Display up to 3 concurrent HLS video streams
- **AWS MediaPackage integration**: Configured for AWS MediaPackage endpoints
- **Responsive grid layout**: Automatically adjusts video layout based on screen size
- **Cross-browser compatibility**: Uses hls.js for browsers without native HLS support
- **Error handling**: Built-in error logging for stream issues

## Technology Stack

- **React 18** with TypeScript
- **hls.js** for HLS video streaming
- **Webpack** for bundling and development server
- **Babel** for JavaScript transpilation

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-react-project
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:8080`.

### Production Build

Create a production build:
```bash
npm run build
```

## Configuration

### HLS Stream URLs

Update the HLS stream URLs in `src/App.tsx`:

```typescript
const hlsUrls = [
  'https://your-mediapackage-endpoint-1.mediapackage.region.amazonaws.com/out/v1/your-channel-id-1/index.m3u8',
  'https://your-mediapackage-endpoint-2.mediapackage.region.amazonaws.com/out/v1/your-channel-id-2/index.m3u8',
  'https://your-mediapackage-endpoint-3.mediapackage.region.amazonaws.com/out/v1/your-channel-id-3/index.m3u8'
];
```

## Project Structure

```
my-react-project/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
└── README.md             # This file
```

## Roadmap

### Planned Features

- **CloudWatch Metrics Integration**: 
  - Stream health monitoring
  - Viewer analytics
  - Performance metrics dashboard
  - Real-time alerts for stream issues

- **Enhanced Dashboard Features**:
  - Stream status indicators
  - Quality selection controls
  - Volume controls and audio management
  - Full-screen mode support

- **AWS Integration**:
  - CloudWatch dashboard widgets
  - AWS SDK integration for metrics collection
  - IAM role-based access controls

## Browser Support

- Chrome 34+
- Firefox 42+
- Safari 8+
- Edge 12+

For browsers without native HLS support, the application automatically falls back to hls.js.

## Troubleshooting

### Common Issues

1. **Video not loading**: Check that HLS URLs are accessible and properly formatted
2. **CORS errors**: Ensure your MediaPackage endpoints have proper CORS configuration
3. **Build errors**: Verify all dependencies are installed with `npm install`

### Error Logging

The application logs HLS errors to the browser console. Check the developer tools for detailed error information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]

## Support

For issues and questions, please [create an issue](link-to-issues) in the repository.