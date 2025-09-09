# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- **Development**: `yarn start:dev` - Start application in development mode with hot reload
- **Build**: `yarn build` - Build the application for production
- **Production**: `yarn start` - Start the built application
- **Tests**: `yarn test` - Run all tests with coverage
- **Test Watch**: `yarn test:watch` - Run tests in watch mode
- **E2E Tests**: `yarn test:e2e` - Run end-to-end tests

### Code Quality

- **Lint**: `yarn lint` - Fix linting issues automatically
- **Lint Check**: `yarn lint:check` - Check for linting issues without fixing
- **Format**: `yarn format` - Format code with Prettier
- **Format Check**: `yarn format:check` - Check formatting without changes
- **Combined Check**: `yarn lint:format:check` - Run both lint and format checks

### Other Commands

- **Clean**: `yarn clean` - Remove build artifacts and dependencies
- **Release**: `yarn release` - Create a new release using standard-version

## Architecture Overview

This is a **NestJS-based Backend for Frontend (BFF)** application that serves as an orchestration layer between frontend clients and backend services.

### Key Technologies

- **Framework**: NestJS v11.1.6 with TypeScript
- **Testing**: Jest with comprehensive test coverage
- **Documentation**: Swagger/OpenAPI 3.0
- **Toolkit**: @tresdoce-nestjs-toolkit for shared utilities
- **Package Manager**: Yarn (required - see packageManager field)

### Project Structure

```
src/
├── config/           # Environment configuration and validation
├── users/            # User management module
├── characters/       # Characters module (Rick & Morty API integration)
├── utils/            # Utility services
├── app.module.ts     # Root application module
└── main.ts           # Application bootstrap
```

### Module Architecture

The application follows NestJS modular architecture with:

- **Feature Modules**: Each domain (users, characters) has its own module
- **Shared Modules**: Utils module for common functionality
- **Configuration Module**: Centralized environment variable management
- **Toolkit Integration**: Uses @tresdoce-nestjs-toolkit for standardized features

### Configuration System

- Environment-based configuration in `src/config/`
- Environment files: `.env` (local), `.env.test` (testing)
- Configuration validation using Joi schemas
- Typed configuration access through ConfigService

### Key Features

- **API Documentation**: Swagger UI available at `/{context}/docs` (default: `/v1/docs`)
- **Health Checks**: Built-in health monitoring
- **Request Tracing**: OpenTelemetry integration
- **CORS Configuration**: Configurable cross-origin settings
- **Global Validation**: DTO validation with class-validator
- **Response Interceptors**: Standardized API response format

### External Integrations

- **Rick & Morty API**: Configured service for character data
- **HTTP Client**: @tresdoce-nestjs-toolkit/http-client for external API calls

### Testing Strategy

- Unit tests for all modules (controllers and services)
- Jest configuration with coverage reports
- E2E tests for integration testing
- Global setup/teardown for test environment

### Docker Support

- Dockerfile for containerization
- docker-compose.yml for local development
- Environment variable injection for containers

## BFF Pattern Implementation

This application implements the Backend for Frontend pattern to:

- **Orchestrate Services**: Coordinate calls to multiple backend services
- **Data Transformation**: Adapt backend responses for frontend needs
- **Security Layer**: Handle authentication and filter sensitive data
- **Performance**: Implement caching and reduce client requests
- **API Versioning**: Provide versioned APIs through context routing

## Environment Configuration

The application uses a sophisticated environment management system:

- Different env files per environment (local, test, production)
- Centralized configuration in `src/config/configuration.ts`
- Schema validation for required variables
- Type-safe configuration access

Key environment variables include server settings, CORS configuration, Swagger settings, and external service URLs.
