# MainPage Component

## Overview

The MainPage component is the main layout component that handles lecture content display and navigation.

## Features

- Displays lecture content using LectureViewer
- Handles lecture navigation through Sidebar
- Shows introduction content when no lecture is selected
- Manages loading states and error handling

## Component Structure

### Imports

```typescript
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '@widgets/sidebar/ui/Sidebar';
import { LectureViewer } from '@widgets/lecture-viewer/ui/LectureViewer';
import { parseLectureContent } from '@entities/lecture/lib/parseLecture';
```

### State Management

- `lectureContent`: Stores the current lecture content
- `isLoading`: Tracks loading state during lecture fetching

### Key Functions

#### loadLecture

- Loads lecture content based on the selected lecture ID
- Handles introduction content when no lecture is selected
- Manages error states and loading indicators

#### handleSelectLecture

- Handles lecture selection through navigation
- Updates the URL with the selected lecture ID

### Component Layout

```jsx
<div className={styles.app}>
  <Sidebar />
  <main className={styles.content}>{/* Content display logic */}</main>
</div>
```

## Content Display Logic

1. Shows loading indicator during content fetch
2. Displays lecture content through LectureViewer when available
3. Shows error message if content loading fails

## Error Handling

- Catches and logs errors during lecture loading
- Provides user feedback for loading failures
- Maintains empty state when content cannot be loaded
