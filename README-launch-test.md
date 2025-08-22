# Launch New Test Flow - Implementation Guide

## Overview

The Launch New Test flow is a seamless conversational interface integrated into the AI Chat component. It allows advisors to quickly launch sustainability assessments for their clients through a guided slot-filling process.

## Architecture

### Database Layer
- **assessments**: Main table for test instances
- **assessment_versions**: Available assessment templates 
- **quota_packages**: Test quota management per advisor
- **vw_fa_quota**: Aggregated quota view
- **rpc_launch_test**: Atomic RPC function for launching tests

### Service Layer
- **testLaunchApi.ts**: TypeScript wrapper with validation
- **test-launch.tsx**: Server-side Hono routes
- Row Level Security (RLS) enforced on all operations

### Frontend Integration
- **AiChat.tsx**: Extended with launch flow state management
- **useClientRegistry.ts**: Cache invalidation hooks
- Existing UI components reused (chips, typeahead, date picker, etc.)

## Flow Steps

1. **Intent Detection**: "launch new test", "new test", or quick action button
2. **Client Selection**: Typeahead search with inline client creation
3. **Assessment Version**: Chip selection from available versions
4. **Channel**: Email or Shareable Link options  
5. **Due Date**: Date picker (default: today + 14 days)
6. **Language**: EN/DE/PT selection
7. **Notes**: Optional textarea input
8. **Quota Check**: Warning if low quota, with override option
9. **Confirmation**: Summary card with all selections
10. **Launch**: Atomic RPC execution
11. **Success**: Result card with deep links and actions

## Validation Rules

- **Email**: Valid format and unique per advisor
- **Assessment Version**: Must exist and be active
- **Due Date**: Cannot be in the past
- **Client Access**: Must belong to current advisor (RLS enforced)
- **Quota**: Checked before launch, with graceful degradation

## Data Persistence

### Assessment Record
```sql
INSERT INTO assessments (
  advisor_id,     -- auth.uid() (RLS enforced)
  client_id,      -- Selected from advisor's clients
  assessment_version_id,
  channel,        -- 'email' | 'link'
  lang,          -- 'EN' | 'DE' | 'PT'
  due_date,
  notes,
  status         -- 'requested'
);
```

### Quota Management
- Automatic decrement on successful launch
- Warning when < 5 tests remaining
- Graceful error handling for insufficient quota

## Integration Points

### Client Management Refresh
```typescript
const { refreshAll } = useClientRegistry();
await refreshAll(); // Updates KPIs and client list
```

### Navigation Deep Links
- **View Client**: Navigate to client profile
- **Client Management**: Refresh and view client directory
- **Copy Link**: Clipboard integration for shareable links

### Analytics Events (Ready for Implementation)
- `launch_flow_started`
- `client_selected_or_created`
- `version_selected`
- `channel_selected`
- `due_set`
- `lang_set`
- `notes_added`
- `quota_blocked|warning`
- `launch_confirmed`
- `launch_success`
- `launch_error`

## Testing Instructions

### Local Development

1. **Database Setup**:
   ```bash
   # Run the migration
   supabase db reset
   supabase db push
   
   # Or apply manually
   psql -h localhost -U postgres -d postgres -f database/launch-test-migration.sql
   ```

2. **Test Data**:
   ```sql
   -- Verify assessment versions exist
   SELECT * FROM assessment_versions WHERE is_active = true;
   
   -- Check default quota
   SELECT * FROM vw_fa_quota WHERE advisor_id = auth.uid();
   
   -- Test RPC directly
   SELECT rpc_launch_test(
     'client-uuid',
     'version-uuid',  
     'email',
     '2024-02-01T00:00:00Z',
     'EN',
     'Test notes'
   );
   ```

3. **Flow Testing**:
   - Open AI Chat
   - Click "Launch New Test" or type "launch new test"
   - Complete each step of the flow
   - Verify data persistence and cache invalidation
   - Test error scenarios (invalid data, quota limits)

### Production Testing

1. **Smoke Test**:
   - Complete flow with existing client
   - Verify email/link generation
   - Check quota decrement
   - Confirm Client Management refresh

2. **Edge Cases**:
   - New client creation during flow
   - Low/zero quota scenarios  
   - Network interruption handling
   - Mobile vs desktop experience

3. **Performance**:
   - Flow completion in ≤6 turns
   - UI responsiveness on mobile
   - Cache invalidation timing

## Error Handling

### Frontend
- Form validation with inline errors
- Network error graceful degradation
- Toast notifications for user feedback
- Conversation state preservation

### Backend  
- RLS policy enforcement
- Quota validation with clear messages
- Atomic operations (RPC prevents partial writes)
- Detailed error logging

### Demo Mode
- Full flow simulation when offline
- Consistent UX regardless of backend state
- Automatic fallback activation

## Security

- **Authentication**: All endpoints require valid JWT
- **Authorization**: RLS ensures advisor can only access own data
- **Validation**: Server-side validation of all parameters
- **Rate Limiting**: Applied to all endpoints
- **CORS**: Properly configured for production domains

## Performance Optimizations

- **Caching**: Client registry cache with 5-minute TTL
- **Batching**: Single RPC call for atomic operations
- **Lazy Loading**: Assessment versions loaded on demand
- **State Management**: Minimal re-renders in conversation flow

## Future Enhancements

1. **Email Queue**: Replace placeholder with actual email service
2. **Real-time Updates**: WebSocket integration for assessment status
3. **Bulk Launch**: Multi-client selection capability
4. **Templates**: Save and reuse launch configurations
5. **Scheduling**: Delayed launch with cron integration

## Troubleshooting

### Common Issues

1. **Flow Not Starting**: Check authentication and network connectivity
2. **Client List Empty**: Verify RLS policies and client registry data
3. **Quota Errors**: Check quota_packages table for advisor
4. **RPC Failures**: Review server logs for detailed error messages

### Debug Commands

```sql
-- Check user authentication
SELECT auth.uid();

-- Verify client access
SELECT * FROM client_registry WHERE advisor_id = auth.uid();

-- Check quota status  
SELECT * FROM vw_fa_quota WHERE advisor_id = auth.uid();

-- Review recent assessments
SELECT * FROM assessments WHERE advisor_id = auth.uid() ORDER BY created_at DESC LIMIT 10;
```

## Support

For issues or questions:
1. Check browser console for detailed error logs
2. Review server logs in Supabase dashboard
3. Verify database schema matches migration
4. Test with demo mode to isolate backend issues

The Launch New Test flow provides a seamless, mobile-optimized experience for test management while maintaining data integrity and security best practices.