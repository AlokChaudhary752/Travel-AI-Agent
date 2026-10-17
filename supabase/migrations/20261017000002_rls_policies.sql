-- ==============================================================================
-- VOYARA LUXURY CONCIERGE — ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 20261017000002_rls_policies.sql
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 3. Trips Policies (Owner + Collaborative Members)
CREATE POLICY "Users can view trips they own or are members of"
    ON public.trips FOR SELECT
    USING (
        auth.uid() = owner_id OR
        EXISTS (
            SELECT 1 FROM public.trip_members
            WHERE trip_members.trip_id = trips.id
            AND trip_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create their own trips"
    ON public.trips FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Trip owners and editors can update trips"
    ON public.trips FOR UPDATE
    USING (
        auth.uid() = owner_id OR
        EXISTS (
            SELECT 1 FROM public.trip_members
            WHERE trip_members.trip_id = trips.id
            AND trip_members.user_id = auth.uid()
            AND trip_members.role IN ('owner', 'editor')
        )
    );

CREATE POLICY "Trip owners can delete their trips"
    ON public.trips FOR DELETE
    USING (auth.uid() = owner_id);

-- 4. Trip Members Policies
CREATE POLICY "Trip members can view other members"
    ON public.trip_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = trip_members.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members tm2
                WHERE tm2.trip_id = trips.id AND tm2.user_id = auth.uid()
            ))
        )
    );

CREATE POLICY "Trip owners can manage members"
    ON public.trip_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = trip_members.trip_id
            AND trips.owner_id = auth.uid()
        )
    );

-- 5. Itinerary Items Policies
CREATE POLICY "Members can view itinerary items"
    ON public.itinerary_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = itinerary_items.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members
                WHERE trip_members.trip_id = trips.id AND trip_members.user_id = auth.uid()
            ))
        )
    );

CREATE POLICY "Owners and editors can modify itinerary items"
    ON public.itinerary_items FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = itinerary_items.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members
                WHERE trip_members.trip_id = trips.id
                AND trip_members.user_id = auth.uid()
                AND trip_members.role IN ('owner', 'editor')
            ))
        )
    );

-- 6. Expenses Policies
CREATE POLICY "Members can view trip expenses"
    ON public.expenses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = expenses.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members
                WHERE trip_members.trip_id = trips.id AND trip_members.user_id = auth.uid()
            ))
        )
    );

CREATE POLICY "Members can insert expenses"
    ON public.expenses FOR INSERT
    WITH CHECK (auth.uid() = paid_by);

-- 7. Price Alerts Policies
CREATE POLICY "Users can manage their own price alerts"
    ON public.price_alerts FOR ALL
    USING (auth.uid() = user_id);

-- 8. Messages Policies
CREATE POLICY "Users can view trip messages"
    ON public.messages FOR SELECT
    USING (
        auth.uid() = user_id OR
        (trip_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = messages.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members
                WHERE trip_members.trip_id = trips.id AND trip_members.user_id = auth.uid()
            ))
        ))
    );

CREATE POLICY "Users can insert messages"
    ON public.messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 9. Notifications Policies
CREATE POLICY "Users can view and update their own notifications"
    ON public.notifications FOR ALL
    USING (auth.uid() = user_id);

-- 10. Documents Policies
CREATE POLICY "Users can view vaulted documents for their trips"
    ON public.documents FOR SELECT
    USING (
        auth.uid() = user_id OR
        (trip_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.trips
            WHERE trips.id = documents.trip_id
            AND (trips.owner_id = auth.uid() OR EXISTS (
                SELECT 1 FROM public.trip_members
                WHERE trip_members.trip_id = trips.id AND trip_members.user_id = auth.uid()
            ))
        ))
    );

CREATE POLICY "Users can insert their own vaulted documents"
    ON public.documents FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 11. Memories Policies (Vector AI Context)
CREATE POLICY "Users can manage their own AI memories"
    ON public.memories FOR ALL
    USING (auth.uid() = user_id);

-- 12. Audit Log Policies
CREATE POLICY "Users can view their own audit entries"
    ON public.audit_log FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "System can log audit events"
    ON public.audit_log FOR INSERT
    WITH CHECK (true);
